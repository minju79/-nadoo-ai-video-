'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Phone, FileText, Bot, Sparkles, User, Loader2, Menu } from "lucide-react";

// Responsive Infinite Scrolling Video Column
const VideoColumn = ({ videos, speed, direction = 1, mobileHidden = false }: { videos: string[], speed: number, direction?: number, mobileHidden?: boolean }) => {
  return (
    <div className={`video-column ${mobileHidden ? 'mobile-hidden' : ''}`} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
          gap: "1.5rem",
          willChange: "transform"
        }}
      >
        {[...videos, ...videos, ...videos].map((src, i) => (
          <div key={i} className="video-item" style={{ 
            position: "relative", 
            borderRadius: "20px", 
            overflow: "hidden",
            boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
            backgroundColor: "#000",
            border: "1px solid rgba(255,255,255,0.05)",
            opacity: 0.5,
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
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => { setIsSuccess(false); setIsChatActive(false); }, 5000);
      }
    } catch (error) {
      alert("전송 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#050505", color: "#ffffff", overflowX: "hidden" }}>
      
      {/* 1. Background */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", gap: "1rem", zIndex: 0, pointerEvents: "none" }}>
        <VideoColumn videos={videos} speed={45} direction={1} />
        <VideoColumn videos={videos} speed={70} direction={-1} mobileHidden />
      </div>

      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(5,5,5,0.95) 100%)", zIndex: 1 }} />

      {/* 2. Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.3rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.15em" }}>
            NADOO <span className="neon-text">VIDEO</span>
          </div>
          <div className="desktop-only" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            <a style={{ fontWeight: "700" }}>SHOWREEL</a>
            <a style={{ fontWeight: "700" }}>SOLUTIONS</a>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "0.7rem 1.8rem" }}>GET STARTED</button>
          </div>
          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", color: "var(--primary)" }}>
            <Menu size={28} />
          </button>
        </nav>

        {/* Hero Section */}
        <main className="container" style={{ paddingTop: "6rem", paddingBottom: "8rem", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="neon-text" style={{ 
              fontFamily: "var(--font-handwriting)", 
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)", 
              marginBottom: "1rem", 
              display: "block",
              transform: "rotate(-2deg)"
            }}>
              살아 움직이는 비즈니스의 시작
            </span>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "clamp(2.8rem, 8vw, 8rem)", 
              fontWeight: "400", 
              lineHeight: 1.1, 
              marginBottom: "3rem",
              wordBreak: "keep-all",
              padding: "0 0.5rem"
            }}>
              당신의 브랜드를 <br />
              <span className="neon-text" style={{ fontStyle: "italic" }}>혁신적인 영상</span>으로
            </h1>
            
            <p style={{ 
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)", 
              color: "#aaa", 
              maxWidth: "750px", 
              margin: "0 auto 4rem", 
              lineHeight: "1.6",
              wordBreak: "keep-all",
              padding: "0 1rem"
            }}>
              멈춰있는 이미지보다 강력한 한 마디. <br />
              나도 AI 미디어가 제안하는 영상 솔루션으로 시선을 사로잡으세요.
            </p>
            
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "1.4rem 3.5rem", fontSize: "1.1rem" }}>
              무료 상담 신청하기
            </button>
          </motion.div>

          {/* Slogan & Bot */}
          <section style={{ marginTop: "12rem", marginBottom: "8rem", textAlign: "center" }}>
            <div style={{ 
              background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)", 
              padding: "5rem 1rem", 
              borderRadius: "32px", 
              border: "1px solid rgba(255,255,255,0.02)" 
            }}>
              
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: "5rem" }}>
                <h2 className="neon-text" style={{ 
                  fontFamily: "var(--font-handwriting)", 
                  fontSize: "clamp(2.2rem, 6vw, 6rem)", 
                  lineHeight: "1.3",
                  marginBottom: "1.5rem",
                  wordBreak: "keep-all",
                  padding: "0 1rem"
                }}>
                  "비즈니스의 미래, <br className="mobile-only" /> 영상으로 답하다."
                </h2>
                <div style={{ fontSize: "0.9rem", color: "#333", letterSpacing: "0.4em" }}>
                  AI VISIONARY CONSULTATION
                </div>
              </motion.div>

              {/* Refined AI Chatbot Card */}
              <motion.div 
                style={{ 
                  maxWidth: "800px", 
                  margin: "0 auto", 
                  background: "rgba(204, 255, 0, 0.02)", 
                  padding: "3rem 1.5rem", 
                  borderRadius: "24px", 
                  border: "1px solid rgba(204, 255, 0, 0.15)",
                  textAlign: "left"
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
                  <div style={{ padding: "0.8rem", background: "var(--primary)", borderRadius: "14px" }}>
                    <Bot size={32} color="#000" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: "950" }}>나두 AI 상담봇</h3>
                    <p style={{ color: "var(--primary)", fontWeight: "700", fontSize: "0.9rem" }}>Direct Media Solution</p>
                  </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "0 20px 20px 20px", fontSize: "1.1rem", lineHeight: "1.6", color: "#eee", wordBreak: "keep-all" }}>
                    반갑습니다! 오민주 대표입니다. 고객님의 비즈니스에 꼭 맞는 영상 전략을 제안해 드릴게요. 😊
                  </div>

                  {!isChatActive && !isSuccess ? (
                    <button onClick={() => setIsChatActive(true)} className="btn-primary" style={{ width: "100%", padding: "1.2rem", fontSize: "1.1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.8rem" }}>
                      <Sparkles size={18} /> 상담 신청서 작성
                    </button>
                  ) : isSuccess ? (
                    <div style={{ background: "rgba(204, 255, 0, 0.08)", padding: "2rem", borderRadius: "20px", textAlign: "center", border: "1px solid var(--primary)" }}>
                      <h4 style={{ fontSize: "1.4rem", fontWeight: "900", color: "var(--primary)" }}>신청 완료! 곧 연락드릴게요. ✨</h4>
                    </div>
                  ) : (
                    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleChatSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <input name="name" type="text" placeholder="성함" required className="mobile-input-fix" />
                      <input name="phone" type="tel" placeholder="연락처" required className="mobile-input-fix" />
                      <textarea name="message" placeholder="상담 내용을 입력해주세요." rows={3} required className="mobile-input-fix" style={{ resize: "none" }} />
                      <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: "1.2rem" }}>
                        {isSubmitting ? "전송 중..." : "상담 신청 보내기"}
                      </button>
                    </motion.form>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "8rem", paddingBottom: "4rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "6rem" }}>
            <div style={{ textAlign: "left" }}>
              <div className="neon-text" style={{ fontSize: "2.5rem", fontWeight: "950", marginBottom: "3rem", fontFamily: "var(--font-serif)" }}>NADOO_AI</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}><MapPin size={18} className="neon-text" /><span style={{ fontWeight: "900", fontSize: "1rem" }}>LOCATION</span></div>
                  <p style={{ color: "#666", fontSize: "1rem", lineHeight: "1.6" }}>광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)</p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}><Phone size={18} className="neon-text" /><span style={{ fontWeight: "900", fontSize: "1rem" }}>CONTACT</span></div>
                  <p style={{ color: "#666", fontSize: "1rem", lineHeight: "1.6" }}>대표번호: 010-4892-3376<br />nadoo_ai@naver.com</p>
                </div>
                <p style={{ color: "#444", fontSize: "0.9rem", marginTop: "2rem" }}>
                  상호: 나두에이아이 | 대표자: 오민주 | 사업자번호: 434-40-01488<br />
                  © 2026 NADOO AI VIDEO. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
