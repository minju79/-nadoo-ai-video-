'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, FileText, Bot, Sparkles, Loader2, Menu, X } from "lucide-react";

// Diagonal Floating Video Column (Mirrorly Inspired)
const VideoColumn = ({ videos, speed, direction = 1, delay = 0 }: { videos: string[], speed: number, direction?: number, delay?: number }) => {
  return (
    <div className="video-column" style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "2.5rem",
      flex: "0 0 350px",
      transform: "translateZ(0)"
    }}>
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: direction > 0 ? [0, -2000] : [-2000, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear", delay: delay }}
        style={{ display: "flex", flexDirection: "column", gap: "2.5rem", willChange: "transform" }}
      >
        {[...videos, ...videos, ...videos].map((src, i) => (
          <div key={i} style={{ 
            position: "relative", borderRadius: "30px", overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.5)", backgroundColor: "#111",
            border: "1px solid rgba(255,255,255,0.05)", opacity: 0.6,
            height: "550px"
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
    <div style={{ position: "relative", minHeight: "100vh", background: "#050505", color: "#ffffff", overflow: "hidden" }}>
      
      {/* 1. DIAGONAL BACKGROUND (Mirrorly Style) */}
      <div style={{ 
        position: "fixed", 
        top: "-20%", 
        left: "-20%", 
        width: "140%", 
        height: "140%", 
        zIndex: 0,
        transform: "rotate(-10deg)", // THE CRITICAL TILT
        display: "flex",
        justifyContent: "center",
        gap: "3rem",
        pointerEvents: "none"
      }}>
        <VideoColumn videos={videos} speed={50} direction={1} delay={0} />
        <VideoColumn videos={videos} speed={75} direction={-1} delay={1} />
        <VideoColumn videos={videos} speed={45} direction={1} delay={0.5} />
        <VideoColumn videos={videos} speed={90} direction={-1} delay={2} />
        <VideoColumn videos={videos} speed={60} direction={1} delay={1.5} />
      </div>

      {/* Overlay for readability */}
      <div style={{ 
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
        background: "radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(5,5,5,0.95) 100%)", 
        zIndex: 1 
      }} />

      {/* 2. Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{ padding: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.8rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.2em" }}>
            NADOO <span className="neon-text">VIDEO</span>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "0.8rem 2.5rem" }}>CONTACT</button>
        </nav>

        {/* Hero Section */}
        <main className="container" style={{ paddingTop: "10rem", paddingBottom: "15rem", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <span className="neon-text" style={{ 
              fontFamily: "var(--font-handwriting)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
              marginBottom: "2rem", display: "block", transform: "rotate(-3deg)", fontStyle: "italic"
            }}>
              살아 움직이는 비즈니스의 시작
            </span>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)", fontSize: "clamp(4rem, 12vw, 10rem)", 
              fontWeight: "400", lineHeight: 0.9, marginBottom: "4rem", wordBreak: "keep-all"
            }}>
              당신의 브랜드를 <br />
              <span className="neon-text" style={{ fontStyle: "italic" }}>혁신적인 영상</span>으로
            </h1>
            
            <p style={{ 
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)", color: "#999", maxWidth: "800px", 
              margin: "0 auto 6rem", lineHeight: "1.8", wordBreak: "keep-all", fontWeight: "300"
            }}>
              멈춰있는 이미지보다 강력한 <br />
              영상 솔루션으로 시선을 사로잡으세요.
            </p>
            
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "1.8rem 5rem", fontSize: "1.3rem" }}>
              무료 상담 신청하기
            </button>
          </motion.div>

          {/* Floating Chatbot Section */}
          <section style={{ marginTop: "20rem" }}>
            <div style={{ background: "rgba(255,255,255,0.01)", padding: "10rem 2rem", borderRadius: "60px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ marginBottom: "8rem" }}>
                <h2 className="neon-text" style={{ 
                  fontFamily: "var(--font-handwriting)", fontSize: "clamp(3.5rem, 9vw, 8rem)", 
                  lineHeight: "1.2", marginBottom: "2.5rem", wordBreak: "keep-all", transform: "rotate(-2deg)"
                }}>
                  "비즈니스의 미래, <br /> 영상으로 답하다."
                </h2>
              </motion.div>

              <div style={{ maxWidth: "850px", margin: "0 auto", background: "rgba(204, 255, 0, 0.02)", padding: "5rem 2rem", borderRadius: "40px", border: "1px solid rgba(204, 255, 0, 0.2)", textAlign: "left" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2rem", marginBottom: "4rem" }}>
                  <div style={{ padding: "1.2rem", background: "var(--primary)", borderRadius: "20px" }}><Bot size={45} color="#000" /></div>
                  <div><h3 style={{ fontSize: "2.5rem", fontWeight: "950" }}>나두 AI 상담봇</h3><p style={{ color: "var(--primary)", fontWeight: "800", fontSize: "1.1rem" }}>Direct Media Solution</p></div>
                </div>
                
                <form onSubmit={handleChatSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <input name="name" type="text" placeholder="성함" required className="mobile-input-fix" style={{ fontSize: "1.2rem", padding: "1.5rem" }} />
                  <input name="phone" type="tel" placeholder="연락처" required className="mobile-input-fix" style={{ fontSize: "1.2rem", padding: "1.5rem" }} />
                  <textarea name="message" placeholder="궁금하신 내용" rows={4} required className="mobile-input-fix" style={{ fontSize: "1.2rem", padding: "1.5rem" }} />
                  <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: "1.5rem", fontSize: "1.3rem" }}>
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "상담 신청 완료"}
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "15rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10rem", textAlign: "left" }}>
            <div className="neon-text" style={{ fontSize: "4rem", fontWeight: "950", marginBottom: "5rem", fontFamily: "var(--font-serif)" }}>NADOO_AI</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
              <div><span style={{ fontWeight: "900", color: "var(--primary)", fontSize: "1.2rem" }}>LOCATION</span><p style={{ color: "#777", marginTop: "1.5rem", fontSize: "1.2rem" }}>광주광역시 서구 상무중앙로 7, 5층 (치평동, 상무타워)</p></div>
              <div><span style={{ fontWeight: "900", color: "var(--primary)", fontSize: "1.2rem" }}>CONTACT</span><p style={{ color: "#777", marginTop: "1.5rem", fontSize: "1.2rem" }}>010-4892-3376 | nadoo_ai@naver.com</p></div>
            </div>
            <p style={{ color: "#444", marginTop: "5rem", fontSize: "1rem" }}>상호: 나두에이아이 | 대표자: 오민주 | 사업자번호: 434-40-01488<br />© 2026 NADOO AI VIDEO. ALL RIGHTS RESERVED.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
