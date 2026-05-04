'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Phone, FileText, Bot, Sparkles, Loader2, Menu } from "lucide-react";

// Robust Responsive Infinite Video Column
const VideoColumn = ({ videos, speed, direction = 1, desktopOnly = false }: { videos: string[], speed: number, direction?: number, desktopOnly?: boolean }) => {
  return (
    <div className={`video-column ${desktopOnly ? 'desktop-only' : ''}`} style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "2rem",
      flex: 1,
      minWidth: "220px",
      maxWidth: "400px"
    }}>
      <motion.div 
        animate={{ y: direction > 0 ? [0, -1800] : [-1800, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        style={{ display: "flex", flexDirection: "column", gap: "2rem", transform: "translateZ(0)", willChange: "transform" }}
      >
        {[...videos, ...videos, ...videos].map((src, i) => (
          <div key={i} className="video-item" style={{ 
            position: "relative", borderRadius: "24px", overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)", backgroundColor: "#000",
            border: "1px solid rgba(255,255,255,0.05)", opacity: 0.6, transform: "translateZ(0)"
          }}>
            <video src={src} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
  const videos = ["/work/nadoo1.mp4", "/work/nadoo2.mp4", "/work/nadoo3.mp4", "/work/nadoo4.mp4"];

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
    } finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#050505", color: "#ffffff", overflowX: "hidden" }}>
      
      {/* 1. RESTORED 4 COLUMN VIDEO BACKGROUND */}
      <div style={{ 
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
        display: "flex", justifyContent: "center", gap: "2rem", zIndex: 0, 
        pointerEvents: "none", padding: "0 1rem"
      }}>
        <VideoColumn videos={videos} speed={40} direction={1} />
        <VideoColumn videos={videos} speed={65} direction={-1} />
        <VideoColumn videos={videos} speed={50} direction={1} desktopOnly />
        <VideoColumn videos={videos} speed={80} direction={-1} desktopOnly />
      </div>

      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(5,5,5,0.9) 100%)", zIndex: 1 }} />

      {/* 2. Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{ padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.2em" }}>
            NADOO <span className="neon-text">VIDEO</span>
          </div>
          <div className="desktop-only" style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            <a style={{ fontWeight: "700" }}>SHOWREEL</a>
            <a style={{ fontWeight: "700" }}>SOLUTIONS</a>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "0.8rem 2.2rem" }}>GET STARTED</button>
          </div>
          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", color: "var(--primary)" }}>
            <Menu size={32} />
          </button>
        </nav>

        {/* Hero Section */}
        <main className="container" style={{ paddingTop: "8rem", paddingBottom: "10rem", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            {/* PI-TTAK-HA-GE (Crooked) Style Applied */}
            <span className="neon-text" style={{ 
              fontFamily: "var(--font-handwriting)", fontSize: "clamp(2rem, 5vw, 4rem)", 
              marginBottom: "1.5rem", display: "block", transform: "rotate(-3deg) translateX(-10px)",
              fontStyle: "italic", fontWeight: "400"
            }}>
              살아 움직이는 비즈니스의 시작
            </span>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)", fontSize: "clamp(3.5rem, 10vw, 8.5rem)", 
              fontWeight: "400", lineHeight: 1, marginBottom: "3.5rem", wordBreak: "keep-all"
            }}>
              당신의 브랜드를 <br />
              <span className="neon-text" style={{ fontStyle: "italic", transform: "skewX(-10deg)", display: "inline-block" }}>혁신적인 영상</span>으로
            </h1>
            
            <p style={{ 
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)", color: "#ccc", maxWidth: "800px", 
              margin: "0 auto 5rem", lineHeight: "1.7", wordBreak: "keep-all", padding: "0 1rem"
            }}>
              멈춰있는 이미지보다 강력한 한 마디. <br />
              나도 AI 미디어가 제안하는 영상 솔루션으로 시선을 사로잡으세요.
            </p>
            
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "1.5rem 4rem", fontSize: "1.2rem" }}>
              무료 상담 신청하기
            </button>
          </motion.div>

          {/* Slogan & Bot */}
          <section style={{ marginTop: "15rem", marginBottom: "10rem" }}>
            <div style={{ background: "rgba(255,255,255,0.01)", padding: "8rem 2rem", borderRadius: "40px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ marginBottom: "6rem" }}>
                <h2 className="neon-text" style={{ 
                  fontFamily: "var(--font-handwriting)", fontSize: "clamp(3.5rem, 8vw, 7.5rem)", 
                  lineHeight: "1.2", marginBottom: "2rem", wordBreak: "keep-all",
                  transform: "rotate(-2deg)", fontStyle: "italic"
                }}>
                  "비즈니스의 미래, <br className="mobile-only" /> 영상으로 답하다."
                </h2>
                <div style={{ fontSize: "1.1rem", color: "#333", letterSpacing: "0.5em", marginTop: "2rem" }}>AI VISIONARY CONSULTATION</div>
              </motion.div>

              {/* Chatbot Card */}
              <div style={{ maxWidth: "850px", margin: "0 auto", background: "rgba(204, 255, 0, 0.02)", padding: "4rem 2rem", borderRadius: "32px", border: "1px solid rgba(204, 255, 0, 0.2)", textAlign: "left" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
                  <div style={{ padding: "1rem", background: "var(--primary)", borderRadius: "18px" }}><Bot size={40} color="#000" /></div>
                  <div><h3 style={{ fontSize: "2rem", fontWeight: "950" }}>나두 AI 상담봇</h3><p style={{ color: "var(--primary)", fontWeight: "800" }}>Professional Media Solution</p></div>
                </div>
                {!isChatActive && !isSuccess ? (
                  <button onClick={() => setIsChatActive(true)} className="btn-primary" style={{ width: "100%", padding: "1.5rem" }}><Sparkles size={20} /> 실시간 상담 시작</button>
                ) : isSuccess ? (
                  <div style={{ background: "rgba(204, 255, 0, 0.1)", padding: "2.5rem", borderRadius: "24px", textAlign: "center" }}><h4>신청 완료! 곧 연락드릴게요. ✨</h4></div>
                ) : (
                  <form onSubmit={handleChatSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                    <div className="input-group">
                      <input name="name" type="text" placeholder="성함" required className="mobile-input-fix" />
                      <input name="phone" type="tel" placeholder="연락처" required className="mobile-input-fix" />
                    </div>
                    <textarea name="message" placeholder="상담 내용을 입력해주세요." rows={3} required className="mobile-input-fix" />
                    <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: "1.3rem" }}>
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send /> 상담 신청 보내기</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "10rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "8rem", textAlign: "left" }}>
            <div className="neon-text" style={{ fontSize: "3rem", fontWeight: "950", marginBottom: "4rem", fontFamily: "var(--font-serif)" }}>NADOO_AI</div>
            <div className="footer-info">
              <div><span style={{ fontWeight: "900", color: "var(--primary)" }}>LOCATION</span><p style={{ color: "#666", marginTop: "1rem" }}>광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)</p></div>
              <div><span style={{ fontWeight: "900", color: "var(--primary)" }}>CONTACT</span><p style={{ color: "#666", marginTop: "1rem" }}>010-4892-3376 | nadoo_ai@naver.com</p></div>
              <p style={{ color: "#444", marginTop: "3rem" }}>상호: 나두에이아이 | 대표자: 오민주 | 사업자번호: 434-40-01488<br />© 2026 NADOO AI VIDEO. ALL RIGHTS RESERVED.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
