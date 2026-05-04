'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Phone, FileText, Bot, Sparkles, User, Loader2, Menu } from "lucide-react";

// Responsive Infinite Scrolling Video Column
const VideoColumn = ({ videos, speed, direction = 1, mobileHidden = false }: { videos: string[], speed: number, direction?: number, mobileHidden?: boolean }) => {
  return (
    <div className={`video-column ${mobileHidden ? 'mobile-hidden' : ''}`} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <motion.div 
        animate={{ 
          y: direction > 0 ? [0, -1800] : [-1800, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: speed, 
          ease: "linear" 
        }}
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "2rem",
          willChange: "transform"
        }}
      >
        {[...videos, ...videos, ...videos].map((src, i) => (
          <div key={i} className="video-item" style={{ 
            position: "relative", 
            borderRadius: "24px", 
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            backgroundColor: "#000",
            border: "1px solid rgba(255,255,255,0.1)",
            opacity: 0.6,
            filter: "brightness(1.1) contrast(1.1)",
            transform: "translateZ(0)"
          }}>
            <video 
              src={src} 
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Formspree Endpoint
  const FORMSPREE_URL = "https://formspree.io/f/xzdoearv";

  const videos = [
    "/work/nadoo1.mp4",
    "/work/nadoo2.mp4",
    "/work/nadoo3.mp4",
    "/work/nadoo4.mp4",
  ];

  const handleChatSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsChatActive(false);
        }, 5000);
      } else {
        alert("죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      alert("서버 연결에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#050505", color: "#ffffff", overflowX: "hidden" }}>
      
      {/* 1. Responsive Video Background */}
      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        display: "flex", 
        justifyContent: "center", 
        gap: "2rem", 
        zIndex: 0,
        pointerEvents: "none",
        padding: "0 1rem"
      }}>
        <VideoColumn videos={videos} speed={45} direction={1} />
        <VideoColumn videos={videos} speed={70} direction={-1} mobileHidden />
        <VideoColumn videos={videos} speed={35} direction={1} mobileHidden />
      </div>

      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        background: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(5,5,5,0.9) 100%)",
        zIndex: 1 
      }} />

      {/* 2. Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{ 
          padding: "2rem 1.5rem", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.2em" }}>
            NADOO <span className="neon-text">VIDEO</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="desktop-only" style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            <a style={{ fontWeight: "700", cursor: "pointer" }}>SHOWREEL</a>
            <a style={{ fontWeight: "700", cursor: "pointer" }}>SOLUTIONS</a>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "0.8rem 2.2rem" }}>GET STARTED</button>
          </div>

          {/* Mobile Menu Trigger */}
          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", color: "var(--primary)" }}>
            <Menu size={32} />
          </button>
        </nav>

        {/* Hero Section */}
        <main className="container" style={{ paddingTop: "8rem", paddingBottom: "10rem", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="neon-text" style={{ 
              fontFamily: "var(--font-handwriting)", 
              fontSize: "clamp(2rem, 5vw, 4rem)", 
              marginBottom: "1.5rem", 
              display: "block",
              transform: "rotate(-2deg)"
            }}>
              살아 움직이는 비즈니스의 시작
            </span>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "clamp(3.5rem, 10vw, 8.5rem)", 
              fontWeight: "400", 
              lineHeight: 1, 
              marginBottom: "3.5rem",
              textShadow: "0 10px 40px rgba(0,0,0,0.8)" 
            }}>
              당신의 브랜드를 <br />
              <span className="neon-text" style={{ fontStyle: "italic" }}>혁신적인 영상</span>으로
            </h1>
            
            <p style={{ 
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)", 
              color: "#ccc", 
              maxWidth: "800px", 
              margin: "0 auto 5rem", 
              lineHeight: "1.7",
              fontWeight: "400",
              wordBreak: "keep-all",
              padding: "0 1rem"
            }}>
              멈춰있는 이미지보다 강력한 한 마디. <br />
              나도 AI 미디어가 제안하는 영상 솔루션으로 고객의 시선을 단숨에 사로잡으세요.
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary" 
              style={{ 
                padding: "1.5rem 4rem", 
                fontSize: "1.2rem", 
                boxShadow: "0 0 40px rgba(204, 255, 0, 0.3)",
                letterSpacing: "0.05em"
              }}
            >
              무료 상담 신청하기
            </button>
          </motion.div>

          {/* Video Features */}
          <section style={{ marginTop: "15rem", paddingBottom: "10rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 7vw, 5rem)", marginBottom: "6rem" }}>Cinematic Experience</h2>
            <div className="feature-grid">
              {[
                { title: "고효율 쇼츠 제작", desc: "바이럴에 최적화된 짧고 강렬한 영상을 AI로 빠르게 제작합니다." },
                { title: "브랜드 스토리텔링", desc: "브랜드의 가치를 한 편의 영화처럼 아름답게 담아냅니다." },
                { title: "자동화 영상 시스템", desc: "지속적으로 콘텐츠를 생산할 수 있는 자동화 파이프라인을 구축합니다." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  className="video-card"
                  whileHover={{ y: -10, borderColor: "var(--primary)" }}
                  style={{ padding: "3.5rem 2.5rem", textAlign: "left", background: "rgba(0,0,0,0.8)" }}
                >
                  <div className="neon-text" style={{ fontFamily: "var(--font-handwriting)", fontSize: "2.5rem", marginBottom: "1rem" }}>
                    Feature 0{i+1}
                  </div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "1.5rem" }}>{feature.title}</h3>
                  <p style={{ color: "#999", fontSize: "1.1rem", lineHeight: "1.7", wordBreak: "keep-all" }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Slogan & AI Consultation Bot */}
          <section className="container" style={{ marginTop: "5rem", marginBottom: "10rem", textAlign: "center" }}>
            <div className="slogan-container" style={{ 
              background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)", 
              padding: "6rem 2rem", 
              borderRadius: "40px", 
              border: "1px solid rgba(255,255,255,0.03)" 
            }}>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: "6rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <h2 className="neon-text" style={{ 
                  fontFamily: "var(--font-handwriting)", 
                  fontSize: "clamp(3rem, 7vw, 7rem)", 
                  lineHeight: "1.2",
                  marginBottom: "2rem",
                  textAlign: "center"
                }}>
                  "비즈니스의 미래, 영상으로 답하다."
                </h2>
                <div style={{ fontSize: "1.1rem", color: "#444", letterSpacing: "0.5em", marginTop: "0.5rem" }}>
                  AI VISIONARY CONSULTATION
                </div>
              </motion.div>

              {/* AI Chatbot Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ 
                  maxWidth: "850px", 
                  margin: "0 auto", 
                  background: "rgba(204, 255, 0, 0.03)", 
                  padding: "4rem 2rem", 
                  borderRadius: "32px", 
                  border: "1px solid rgba(204, 255, 0, 0.2)",
                  textAlign: "left"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
                  <div style={{ padding: "1rem", background: "var(--primary)", borderRadius: "18px" }}>
                    <Bot size={40} color="#000" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "2rem", fontWeight: "950" }}>나두 AI 상담봇</h3>
                    <p style={{ color: "var(--primary)", fontWeight: "800", fontSize: "1rem" }}>Direct Professional Media Solution</p>
                  </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ 
                    background: "rgba(255,255,255,0.04)", 
                    padding: "2rem", 
                    borderRadius: "0 24px 24px 24px", 
                    fontSize: "1.2rem",
                    lineHeight: "1.6"
                  }}>
                    안녕하세요! 오민주 대표입니다. 사용자님께 꼭 맞는 영상 전략을 세워 드릴게요. <br />
                    아래 내용을 입력해 주시면 상담을 시작합니다.
                  </div>

                  {!isChatActive && !isSuccess ? (
                    <button 
                      onClick={() => setIsChatActive(true)}
                      className="btn-primary" 
                      style={{ 
                        width: "100%", 
                        padding: "1.5rem", 
                        fontSize: "1.2rem", 
                        display: "flex", 
                        justifyContent: "center",
                        alignItems: "center", 
                        gap: "1rem",
                        fontWeight: "900"
                      }}
                    >
                      <Sparkles size={20} /> 여기서 바로 상담하기
                    </button>
                  ) : isSuccess ? (
                    <div style={{ background: "rgba(204, 255, 0, 0.1)", padding: "2.5rem", borderRadius: "24px", textAlign: "center", border: "1px solid var(--primary)" }}>
                      <h4 style={{ fontSize: "1.8rem", fontWeight: "900", color: "var(--primary)", marginBottom: "0.5rem" }}>신청 완료!</h4>
                      <p>곧 연락드릴게요! ✨</p>
                    </div>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleChatSubmit}
                      style={{ 
                        background: "rgba(255,255,255,0.05)", 
                        padding: "2rem", 
                        borderRadius: "24px", 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "1.2rem",
                        border: "1px solid rgba(255,255,255,0.1)"
                      }}
                    >
                      <div className="input-group">
                        <input name="name" type="text" placeholder="성함" required className="chat-input" />
                        <input name="phone" type="tel" placeholder="연락처" required className="chat-input" />
                      </div>
                      <textarea name="message" placeholder="궁금하신 내용을 입력해주세요." rows={3} required className="chat-textarea" />
                      <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: "1.3rem", fontSize: "1.2rem", fontWeight: "900", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                        {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> 전송 중...</> : <><Send size={20} /> 상담 신청 전송</>}
                      </button>
                    </motion.form>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "10rem", paddingBottom: "6rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "8rem" }}>
            <div className="footer-content">
              <div style={{ textAlign: "left" }}>
                <div className="neon-text" style={{ fontSize: "3rem", fontWeight: "950", marginBottom: "4rem", fontFamily: "var(--font-serif)", letterSpacing: "0.1em" }}>
                  NADOO_AI
                </div>
                
                <div className="footer-info">
                  <div className="info-block">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <MapPin size={20} className="neon-text" />
                      <span style={{ fontWeight: "900", fontSize: "1.1rem", letterSpacing: "0.1em" }}>LOCATION</span>
                    </div>
                    <p style={{ color: "#777", fontSize: "1.1rem", lineHeight: "1.7" }}>
                      광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)
                    </p>
                  </div>
                  <div className="info-block">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <Phone size={20} className="neon-text" />
                      <span style={{ fontWeight: "900", fontSize: "1.1rem", letterSpacing: "0.1em" }}>CONTACT</span>
                    </div>
                    <p style={{ color: "#777", fontSize: "1.1rem", lineHeight: "1.7" }}>
                      대표번호: 010-4892-3376<br />이메일: nadoo_ai@naver.com
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: "3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <FileText size={20} className="neon-text" />
                    <span style={{ fontWeight: "900", fontSize: "1.1rem", letterSpacing: "0.1em" }}>BUSINESS INFO</span>
                  </div>
                  <p style={{ color: "#777", fontSize: "1.1rem", lineHeight: "1.7" }}>
                    상호: 나두에이아이 | 대표자: 오민주 | 사업자번호: 434-40-01488
                  </p>
                </div>
              </div>

              <div className="footer-copyright">
                © 2026 NADOO AI VIDEO. ALL RIGHTS RESERVED.
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Modal Consultation Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: "fixed", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%", 
              background: "rgba(0,0,0,0.98)", 
              zIndex: 100, 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              backdropFilter: "blur(20px)"
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              style={{ 
                background: "#050505", 
                width: "95%", 
                maxWidth: "600px", 
                borderRadius: "32px", 
                padding: "4rem 2rem", 
                border: "1px solid var(--primary)",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto"
              }}
            >
              <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "none", color: "#fff" }}><X size={32} /></button>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="neon-text" style={{ fontFamily: "var(--font-handwriting)", fontSize: "2.5rem" }}>상담 신청하기</span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: "950", marginTop: "0.5rem" }}>Premium AI Solution</h2>
              </div>
              <form action={FORMSPREE_URL} method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <input type="text" name="name" placeholder="성함" required className="modal-input" />
                <input type="tel" name="phone" placeholder="연락처" required className="modal-input" />
                <select name="interest" required className="modal-input"><option value="">관심 분야 선택</option><option value="shorts">고효율 쇼츠 제작</option><option value="storytelling">브랜드 스토리텔링</option><option value="automation">자동화 영상 시스템</option></select>
                <textarea name="message" placeholder="추가 요청 사항 (선택)" rows={3} className="modal-textarea" />
                <button type="submit" className="btn-primary" style={{ padding: "1.5rem", fontSize: "1.3rem", fontWeight: "900" }}>신청 완료하기</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
