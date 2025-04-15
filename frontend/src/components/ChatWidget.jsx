import { useState, useEffect, useRef } from 'react';
import '../assets/css/ChatWidget.css';
import { useChatContext } from '../contexts/ChatContext';

const ChatWidget = () => {
  const {
    conversationId,
    messages,
    isOpen,
    isLoading,
    setIsOpen,
    sendMessage,
    endConversation,
    rateConversation
  } = useChatContext();
  
  const [inputValue, setInputValue] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleEndConversation = async () => {
    setShowRating(true);
  };

  const handleSubmitRating = async () => {
    await rateConversation(rating, feedback);
    setShowRating(false);
    await endConversation();
  };

  const handleSkipRating = async () => {
    setShowRating(false);
    await endConversation();
  };

  return (
    <div className="chat-widget">
      <button className="chat-button" onClick={toggleChat}>
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chat-container">
          {!showRating ? (
            <>
              <div className="chat-header">
                <h3>Hỗ trợ trực tuyến</h3>
                {conversationId && (
                  <button className="end-chat-btn" onClick={handleEndConversation}>
                    Kết thúc
                  </button>
                )}
              </div>
              
              <div className="chat-messages">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    {message.text}
                  </div>
                ))}
                {isLoading && (
                  <div className="message bot-message typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Nhập tin nhắn..."
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !inputValue.trim()}>
                  Gửi
                </button>
              </form>
            </>
          ) : (
            <div className="rating-container">
              <h3>Đánh giá cuộc trò chuyện</h3>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${rating >= star ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                placeholder="Góp ý thêm (không bắt buộc)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="3"
              ></textarea>
              <div className="rating-buttons">
                <button onClick={handleSubmitRating}>
                  Gửi đánh giá
                </button>
                <button className="skip-btn" onClick={handleSkipRating}>
                  Bỏ qua
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget; 