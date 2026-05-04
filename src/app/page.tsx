'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiscussionEmbed } from 'disqus-react';
import { X, Send, MessageCircle, MapPin, Phone, FileText, Bot, Sparkles, User, CheckCircle2 } from "lucide-react";

// High-quality Infinite Scrolling Video Column
const VideoColumn = ({ videos, speed, direction = 1 }: { videos: string[], speed: number, direction?: number }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
      <motion.div 
        animate={{ 
          y: direction > 0 ? [0, -1800] : [-1800, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: speed, 
          ease: "linear" 
        }}
        style={{ display: "flex", flexDirection: "column", gap: "4rem" }}
      >
        {[...videos, ...videos, ...videos].map((src, i) => (
          <div key={i} style={{ 
            position: "relative", 
            width: "420px", 
            height: "580px", 
            borderRadius: "32px", 
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
            backgroundColor: "#000",
            border: "1px solid rgba(255,255,255,0.1)",
            opacity: 0.7,
            filter: "brightness(1.1) contrast(1.1)" 
          }}>
            <video 
              src={src} 
              autoPlay 
              muted 
              loop 
              playsInline 
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
  const [showBotMessage, setShowBotMessage] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBotMessage(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const videos = [
    "/work/nadoo1.mp4",
    "/work/nadoo2.mp4",
    "/work/nadoo3.mp4",
    "/work/nadoo4.mp4",
  ];

  const disqusShortname = "nadoo-ai"; 
  const disqusConfig = {
    url: "http://localhost:3003",
    identifier: "nadoo-ai-video-home-v3",
    title: "NADOO AI VIDEO - Ultimate Media Hub",
    language: "ko"
  };

  const handleChatSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitted(false);
      setIsChatActive(false);
      alert("상담 신청이 접수되었습니다. 곧 연락드리겠습니다!");
    }, 2000);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#000a1a", color: "#ffffff", overflow: "hidden" }}>
      
      {/* 1. Dynamic Video Wall Background */}
      <div style={{ 
        position: "fixed", 
        top: "-15%", 
        left: "-5%", 
        width: "110%", 
        height: "130%", 
        display: "flex", 
        justifyContent: "center", 
        gap: "6rem", 
        zIndex: 0,
        pointerEvents: "none",
        transform: "rotate(-5deg) scale(1.15)"
      }}>
        <VideoColumn videos={videos} speed={45} direction={1} />
        <VideoColumn videos={videos} speed={70} direction={-1} />
        <VideoColumn videos={videos} speed={35} direction={1} />
        <VideoColumn videos={videos} speed={60} direction={-1} />
      </div>

      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        background: "radial-gradient(circle at center, rgba(0,10,26,0.1) 0%, rgba(0,10,26,0.85) 100%)",
        zIndex: 1 
      }} />

      {/* 2. Cinematic Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <nav style={{ 
          padding: "3.5rem 4rem", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <div style={{ fontSize: "2.2rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.25em" }}>
            NADOO <span className="neon-text">VIDEO</span>
          </div>
          <div style={{ display: "flex", gap: "4rem", fontSize: "1.1rem", fontWeight: "700" }}>
            <a>SHOWREEL</a>
            <a>SOLUTIONS</a>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "0.8rem 2.8rem" }}>GET STARTED</button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="container" style={{ paddingTop: "12rem", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="neon-text" style={{ 
              fontFamily: "var(--font-handwriting)", 
              fontSize: "4rem", 
              marginBottom: "2.5rem", 
              display: "block",
              transform: "rotate(-2deg)"
            }}>
              살아 움직이는 비즈니스의 시작
            </span>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "9.5rem", 
              fontWeight: "400", 
              lineHeight: 0.9, 
              marginBottom: "4.5rem",
              textShadow: "0 10px 50px rgba(0,0,0,1)" 
            }}>
              당신의 브랜드를 <br />
              <span className="neon-text" style={{ fontStyle: "italic" }}>혁신적인 영상</span>으로
            </h1>
            
            <p style={{ 
              fontSize: "1.8rem", 
              color: "#fff", 
              maxWidth: "1100px", 
              margin: "2rem auto 8rem", 
              lineHeight: "1.8",
              fontWeight: "400",
              textShadow: "0 2px 30px rgba(0,0,0,1)",
              wordBreak: "keep-all"
            }}>
              멈춰있는 이미지보다 강력한 한 마디. <br />
              나도 AI 미디어가 제안하는 영상 솔루션으로 <span style={{ whiteSpace: "nowrap" }}>고객의 시선을 단숨에 사로잡으세요.</span>
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary" 
              style={{ 
                padding: "2rem 6.5rem", 
                fontSize: "1.5rem", 
                boxShadow: "0 0 60px rgba(204, 255, 0, 0.4)",
                letterSpacing: "0.1em"
              }}
            >
              무료 상담 신청하기
            </button>
          </motion.div>

          {/* Video Features */}
          <section style={{ marginTop: "25rem", paddingBottom: "15rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "6rem", marginBottom: "10rem" }}>Cinematic Experience</h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "3rem" 
            }}>
              {[
                { title: "고효율 쇼츠 제작", desc: "바이럴에 최적화된 짧고 강렬한 영상을 AI로 빠르게 제작합니다." },
                { title: "브랜드 스토리텔링", desc: "브랜드의 가치를 한 편의 영화처럼 아름답게 담아냅니다." },
                { title: "자동화 영상 시스템", desc: "지속적으로 콘텐츠를 생산할 수 있는 자동화 파이프라인을 구축합니다." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  className="video-card"
                  whileHover={{ y: -15, borderColor: "var(--primary)" }}
                  style={{ padding: "4.5rem 3rem", textAlign: "left", background: "rgba(0,10,26,0.75)" }}
                >
                  <div className="neon-text" style={{ fontFamily: "var(--font-handwriting)", fontSize: "3rem", marginBottom: "1.5rem" }}>
                    Feature 0{i+1}
                  </div>
                  <h3 style={{ 
                    fontSize: "2rem", 
                    fontWeight: "900", 
                    marginBottom: "2.2rem",
                    whiteSpace: "nowrap", 
                    letterSpacing: "-0.03em"
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "#ccc", fontSize: "1.25rem", lineHeight: "1.8", wordBreak: "keep-all" }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Centered Slogan & AI Consultation Bot (Upgraded for Direct Chat) */}
          <section className="container" style={{ marginTop: "5rem", marginBottom: "15rem", textAlign: "center" }}>
            <div style={{ 
              background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)", 
              padding: "10rem 4rem", 
              borderRadius: "60px", 
              border: "1px solid rgba(255,255,255,0.05)", 
              position: "relative" 
            }}>
              
              {/* Massive Slogan - Fixed Centering with width 100% */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: "10rem", width: "100%", textAlign: "center" }}
              >
                <h2 className="neon-text" style={{ 
                  fontFamily: "var(--font-handwriting)", 
                  fontSize: "8rem", 
                  lineHeight: "1.1",
                  marginBottom: "3rem",
                  display: "block",
                  whiteSpace: "nowrap",
                  width: "100%"
                }}>
                  "비즈니스의 미래, 영상으로 답하다."
                </h2>
                <div style={{ fontSize: "1.6rem", color: "#666", letterSpacing: "0.8em", marginTop: "1rem" }}>
                  AI VISIONARY CONSULTATION
                </div>
              </motion.div>

              {/* AI Chatbot Card - Upgraded to Inline Consultation (No more "Second Window" feel) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ 
                  maxWidth: "950px", 
                  margin: "0 auto 12rem", 
                  background: "rgba(204, 255, 0, 0.04)", 
                  padding: "6rem 5rem", 
                  borderRadius: "40px", 
                  border: "2px solid rgba(204, 255, 0, 0.3)",
                  boxShadow: "0 0 120px rgba(204, 255, 0, 0.15)",
                  textAlign: "left",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", marginBottom: "4rem" }}>
                  <div style={{ padding: "1.5rem", background: "var(--primary)", borderRadius: "24px", boxShadow: "0 0 40px rgba(204, 255, 0, 0.5)" }}>
                    <Bot size={55} color="#000" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "3rem", fontWeight: "950", letterSpacing: "-0.02em" }}>나두 AI 상담봇</h3>
                    <p style={{ color: "var(--primary)", fontWeight: "800", fontSize: "1.3rem", marginTop: "0.5rem" }}>
                      Direct Consultation • No Popups Needed
                    </p>
                  </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "5rem" }}>
                  <div style={{ 
                    background: "rgba(255,255,255,0.04)", 
                    padding: "2.5rem", 
                    borderRadius: "0 30px 30px 30px", 
                    fontSize: "1.5rem",
                    lineHeight: "1.6"
                  }}>
                    안녕하세요! 홈페이지에서 바로 궁금한 점을 해결해 드립니다. <br />
                    어떤 영상 솔루션이 필요하신가요?
                  </div>

                  {!isChatActive ? (
                    <button 
                      onClick={() => setIsChatActive(true)}
                      className="btn-primary" 
                      style={{ 
                        width: "fit-content", 
                        padding: "1.5rem 4rem", 
                        fontSize: "1.4rem", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "1.2rem",
                        fontWeight: "900",
                        marginTop: "1rem"
                      }}
                    >
                      <Sparkles size={24} /> 여기서 바로 상담하기
                    </button>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleChatSubmit}
                      style={{ 
                        background: "rgba(255,255,255,0.06)", 
                        padding: "3rem", 
                        borderRadius: "30px", 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "1.5rem",
                        border: "1px solid rgba(255,255,255,0.1)"
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <div style={{ position: "relative" }}>
                          <User size={18} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "var(--primary)" }} />
                          <input type="text" placeholder="성함" required style={{ width: "100%", background: "#000", border: "1px solid #333", borderRadius: "15px", padding: "1.2rem 1.2rem 1.2rem 3.5rem", color: "#fff", fontSize: "1.1rem" }} />
                        </div>
                        <div style={{ position: "relative" }}>
                          <Phone size={18} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "var(--primary)" }} />
                          <input type="tel" placeholder="연락처" required style={{ width: "100%", background: "#000", border: "1px solid #333", borderRadius: "15px", padding: "1.2rem 1.2rem 1.2rem 3.5rem", color: "#fff", fontSize: "1.1rem" }} />
                        </div>
                      </div>
                      <textarea placeholder="궁금하신 내용을 입력해주세요." rows={3} style={{ width: "100%", background: "#000", border: "1px solid #333", borderRadius: "15px", padding: "1.5rem", color: "#fff", fontSize: "1.1rem", resize: "none" }} />
                      <button type="submit" disabled={isSubmitted} className="btn-primary" style={{ padding: "1.5rem", fontSize: "1.3rem", fontWeight: "900", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                        {isSubmitted ? "전송 중..." : <><Send size={22} /> 상담 신청 전송</>}
                      </button>
                    </motion.form>
                  )}
                </div>
              </motion.div>

              {/* Customer Feedback - Clearly Differentiated as "Review Wall" */}
              <div style={{ 
                maxWidth: "1050px", 
                margin: "0 auto", 
                textAlign: "left", 
                paddingTop: "8rem", 
                borderTop: "2px solid rgba(255,255,255,0.1)" 
              }}>
                <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                    <div style={{ padding: "1.2rem", background: "#fff", borderRadius: "50%", boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}>
                      <CheckCircle2 size={36} color="#000" />
                    </div>
                    <h2 style={{ fontSize: "4rem", fontWeight: "950", letterSpacing: "-0.03em" }}>고객 만족 리얼 리뷰</h2>
                  </div>
                  <p style={{ fontSize: "1.5rem", color: "#888", letterSpacing: "0.3em" }}>실시간 고객 소통 & 솔루션 후기</p>
                </div>

                {/* Bright Premium Glass Card - High Visibility */}
                <div style={{ 
                  background: "rgba(255, 255, 255, 0.98)", 
                  padding: "5rem 4rem", 
                  borderRadius: "50px", 
                  boxShadow: "0 50px 120px rgba(0,0,0,0.6), 0 0 50px rgba(204, 255, 0, 0.25)",
                  color: "#000",
                  minHeight: "450px"
                }}>
                  <div style={{ marginBottom: "3rem", borderBottom: "1px solid #eee", paddingBottom: "2rem" }}>
                    <p style={{ fontSize: "1.3rem", color: "#333", fontWeight: "700", lineHeight: "1.6" }}>
                      나도 AI 미디어가 만든 영상으로 성과를 내고 있는 <br />
                      고객님들의 생생한 후기와 자유로운 소통 공간입니다.
                    </p>
                  </div>
                  <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                </div>
              </div>

            </div>
          </section>

          {/* Refined Footer */}
          <footer style={{ marginTop: "15rem", paddingBottom: "8rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10rem" }}>
            <div style={{ maxWidth: "1250px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "8rem" }}>
              {/* Left Side: Business Detailed Info */}
              <div style={{ textAlign: "left" }}>
                <div className="neon-text" style={{ fontSize: "3.8rem", fontWeight: "950", marginBottom: "5rem", fontFamily: "var(--font-serif)", letterSpacing: "0.15em" }}>
                  NADOO_AI
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.5rem" }}>
                        <MapPin size={24} className="neon-text" />
                        <span style={{ color: "#fff", fontWeight: "900", fontSize: "1.3rem", letterSpacing: "0.15em" }}>LOCATION</span>
                      </div>
                      <p style={{ color: "#999", fontSize: "1.25rem", lineHeight: "1.8" }}>
                        광주광역시 서구 상무중앙로 7, 5층<br />
                        (치평동, 상무타워)
                      </p>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.5rem" }}>
                        <Phone size={24} className="neon-text" />
                        <span style={{ color: "#fff", fontWeight: "900", fontSize: "1.3rem", letterSpacing: "0.15em" }}>CONTACT</span>
                      </div>
                      <p style={{ color: "#999", fontSize: "1.25rem", lineHeight: "1.8" }}>
                        대표번호: 010-4892-3376<br />
                        이메일: nadoo_ai@naver.com
                      </p>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.5rem" }}>
                      <FileText size={24} className="neon-text" />
                      <span style={{ color: "#fff", fontWeight: "900", fontSize: "1.3rem", letterSpacing: "0.15em" }}>BUSINESS INFO</span>
                    </div>
                    <p style={{ color: "#999", fontSize: "1.25rem", lineHeight: "1.8" }}>
                      상호: 나두에이아이 | 대표자: 오민주<br />
                      사업자등록번호: 434-40-01488
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", textAlign: "right" }}>
                <div style={{ fontSize: "1.2rem", letterSpacing: "0.5em", color: "#333", fontWeight: "900", marginBottom: "1rem" }}>
                  © 2026 NADOO AI VIDEO. ALL RIGHTS RESERVED.
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Legacy Modal (Still used for "Get Started" buttons) */}
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
              background: "rgba(0,5,10,0.96)", 
              zIndex: 100, 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              backdropFilter: "blur(30px)"
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              style={{ 
                background: "#000a1a", 
                width: "90%", 
                maxWidth: "700px", 
                borderRadius: "50px", 
                padding: "6rem 5rem", 
                border: "1px solid var(--primary)",
                position: "relative",
                boxShadow: "0 0 120px rgba(204, 255, 0, 0.3)"
              }}
            >
              <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: "3rem", right: "3rem", background: "none", border: "none", color: "#fff", cursor: "pointer" }}><X size={40} /></button>
              <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                <span className="neon-text" style={{ fontFamily: "var(--font-handwriting)", fontSize: "3.5rem" }}>상담 신청하기</span>
                <h2 style={{ fontSize: "3.5rem", fontWeight: "950", marginTop: "1rem" }}>Premium AI Solution</h2>
              </div>
              <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <input type="text" name="name" placeholder="성함" required style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "20px", padding: "1.8rem 2rem", color: "#fff", fontSize: "1.3rem" }} />
                <input type="tel" name="phone" placeholder="연락처" required style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "20px", padding: "1.8rem 2rem", color: "#fff", fontSize: "1.3rem" }} />
                <select name="interest" required style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "20px", padding: "1.8rem 2rem", color: "#fff", fontSize: "1.3rem" }}><option value="">관심 분야 선택</option><option value="shorts">고효율 쇼츠 제작</option><option value="storytelling">브랜드 스토리텔링</option><option value="automation">자동화 영상 시스템</option></select>
                <textarea name="message" placeholder="추가 요청 사항 (선택)" rows={4} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "20px", padding: "1.8rem 2rem", color: "#fff", fontSize: "1.3rem", resize: "none" }} />
                <button type="submit" className="btn-primary" style={{ marginTop: "1rem", padding: "2rem", fontSize: "1.5rem", fontWeight: "900", display: "flex", justifyContent: "center", alignItems: "center", gap: "1.2rem" }}><Send size={28} /> 신청 완료하기</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
