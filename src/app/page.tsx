'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiscussionEmbed } from 'disqus-react';
import { X, Send, MessageCircle, MapPin, Phone, FileText, Bot, Sparkles } from "lucide-react";

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
    identifier: "nadoo-ai-video-home",
    title: "NADOO AI VIDEO - Discussion",
    language: "ko"
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
        background: "radial-gradient(circle at center, rgba(0,10,26,0) 0%, rgba(0,10,26,0.8) 100%)",
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
          <div style={{ fontSize: "2rem", fontWeight: "950", fontFamily: "var(--font-serif)", letterSpacing: "0.25em" }}>
            NADOO <span className="neon-text">VIDEO</span>
          </div>
          <div style={{ display: "flex", gap: "4rem", fontSize: "1rem", fontWeight: "700" }}>
            <a>SHOWREEL</a>
            <a>SOLUTIONS</a>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: "0.8rem 2.5rem" }}>GET STARTED</button>
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
              fontSize: "3.8rem", 
              marginBottom: "2.5rem", 
              display: "block",
              transform: "rotate(-2deg)"
            }}>
              살아 움직이는 비즈니스의 시작
            </span>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "9rem", 
              fontWeight: "400", 
              lineHeight: 0.9, 
              marginBottom: "4.5rem",
              textShadow: "0 10px 40px rgba(0,0,0,0.8)" 
            }}>
              당신의 브랜드를 <br />
              <span className="neon-text" style={{ fontStyle: "italic" }}>혁신적인 영상</span>으로
            </h1>
            
            <p style={{ 
              fontSize: "1.75rem", 
              color: "#fff", 
              maxWidth: "1000px", 
              margin: "2rem auto 7rem", 
              lineHeight: "1.8",
              fontWeight: "400",
              textShadow: "0 2px 20px rgba(0,0,0,1)",
              wordBreak: "keep-all"
            }}>
              멈춰있는 이미지보다 강력한 한 마디. <br />
              나도 AI 미디어가 제안하는 영상 솔루션으로 <span style={{ whiteSpace: "nowrap" }}>고객의 시선을 단숨에 사로잡으세요.</span>
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary" 
              style={{ 
                padding: "1.8rem 5.5rem", 
                fontSize: "1.4rem", 
                boxShadow: "0 0 50px rgba(204, 255, 0, 0.4)",
                letterSpacing: "0.05em"
              }}
            >
              무료 상담 신청하기
            </button>
          </motion.div>

          {/* Video Features */}
          <section style={{ marginTop: "25rem", paddingBottom: "15rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "5.5rem", marginBottom: "8rem" }}>Cinematic Experience</h2>
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
                  style={{ padding: "4rem 2.5rem", textAlign: "left", background: "rgba(0,10,26,0.7)" }}
                >
                  <div className="neon-text" style={{ fontFamily: "var(--font-handwriting)", fontSize: "2.8rem", marginBottom: "1.2rem" }}>
                    Feature 0{i+1}
                  </div>
                  <h3 style={{ 
                    fontSize: "1.85rem", 
                    fontWeight: "900", 
                    marginBottom: "1.8rem",
                    whiteSpace: "nowrap", 
                    letterSpacing: "-0.02em"
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "#ccc", fontSize: "1.2rem", lineHeight: "1.7", wordBreak: "keep-all" }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Community & Bot Section (Slogan Integrated) */}
          <section className="container" style={{ marginTop: "10rem", marginBottom: "15rem", textAlign: "center" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "8rem 4rem", borderRadius: "48px", border: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
              
              {/* Massive Slogan with Handwriting */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ marginBottom: "8rem" }}
              >
                <h2 className="neon-text" style={{ 
                  fontFamily: "var(--font-handwriting)", 
                  fontSize: "6.5rem", 
                  lineHeight: "1.2",
                  transform: "rotate(-1deg)",
                  marginBottom: "2rem"
                }}>
                  "비즈니스의 미래, 영상으로 답하다."
                </h2>
                <div style={{ fontSize: "1.4rem", color: "#888", letterSpacing: "0.5em" }}>COMMUNITY & AI CONSULTATION</div>
              </motion.div>

              {/* AI Chatbot Card */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "4rem", textAlign: "left" }}>
                <div style={{ background: "rgba(204, 255, 0, 0.05)", padding: "4rem", borderRadius: "32px", border: "1px solid var(--primary)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
                    <div style={{ padding: "1.2rem", background: "var(--primary)", borderRadius: "20px" }}>
                      <Bot size={40} color="#000" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "2rem", fontWeight: "900" }}>나두 AI 상담봇</h3>
                      <p style={{ color: "var(--primary)", fontWeight: "700" }}>Online • 24/7 AI Assistance</p>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
                    <div style={{ background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "0 20px 20px 20px", fontSize: "1.1rem" }}>
                      안녕하세요! 당신의 비즈니스를 혁신할 영상 솔루션을 찾고 계신가요?
                    </div>
                    <AnimatePresence>
                      {showBotMessage && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          style={{ background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "0 20px 20px 20px", fontSize: "1.1rem", borderLeft: "4px solid var(--primary)" }}
                        >
                          어떤 종류의 영상 제작에 관심이 있으신가요? 지금 상담을 시작해 보세요. ✨
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary" 
                    style={{ width: "100%", padding: "1.5rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}
                  >
                    <Sparkles size={20} /> AI 상담 시작하기
                  </button>
                </div>

                {/* Disqus Comments Integration */}
                <div style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <MessageCircle size={28} className="neon-text" />
                    <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>고객 피드백 & 소통</h2>
                  </div>
                  <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                </div>
              </div>
            </div>
          </section>

          {/* Refined Footer (Aligned to one side) */}
          <footer style={{ marginTop: "15rem", paddingBottom: "6rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "8rem" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "6rem" }}>
              {/* Left Side: Business Detailed Info */}
              <div style={{ textAlign: "left" }}>
                <div className="neon-text" style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "4rem", fontFamily: "var(--font-serif)" }}>
                  NADOO_AI
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                        <MapPin size={20} className="neon-text" />
                        <span style={{ color: "#fff", fontWeight: "800", fontSize: "1.1rem", letterSpacing: "0.1em" }}>LOCATION</span>
                      </div>
                      <p style={{ color: "#aaa", fontSize: "1.15rem", lineHeight: "1.6" }}>
                        광주광역시 서구 상무중앙로 7, 5층<br />
                        (치평동, 상무타워)
                      </p>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                        <Phone size={20} className="neon-text" />
                        <span style={{ color: "#fff", fontWeight: "800", fontSize: "1.1rem", letterSpacing: "0.1em" }}>CONTACT</span>
                      </div>
                      <p style={{ color: "#aaa", fontSize: "1.15rem", lineHeight: "1.6" }}>
                        대표번호: 010-4892-3376<br />
                        이메일: nadoo_ai@naver.com
                      </p>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                      <FileText size={20} className="neon-text" />
                      <span style={{ color: "#fff", fontWeight: "800", fontSize: "1.1rem", letterSpacing: "0.1em" }}>BUSINESS INFO</span>
                    </div>
                    <p style={{ color: "#aaa", fontSize: "1.15rem", lineHeight: "1.6" }}>
                      상호: 나두에이아이 | 대표자: 오민주<br />
                      사업자등록번호: 434-40-01488
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Empty for balance or could add a small map/image */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", textAlign: "right" }}>
                <div style={{ fontSize: "1rem", letterSpacing: "0.5em", color: "#333", fontWeight: "700" }}>
                  © 2026 NADOO AI VIDEO. ALL RIGHTS RESERVED.
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Consultation Form Modal */}
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
              background: "rgba(0,5,10,0.9)", 
              zIndex: 100, 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              backdropFilter: "blur(20px)"
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ 
                background: "#000a1a", 
                width: "90%", 
                maxWidth: "600px", 
                borderRadius: "40px", 
                padding: "4rem", 
                border: "1px solid var(--primary)",
                position: "relative",
                boxShadow: "0 0 80px rgba(204, 255, 0, 0.2)"
              }}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "none", color: "#fff", cursor: "pointer" }}
              >
                <X size={32} />
              </button>

              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <span className="neon-text" style={{ fontFamily: "var(--font-handwriting)", fontSize: "2.5rem" }}>
                  상담 신청하기
                </span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginTop: "1rem" }}>Premium AI Solution</h2>
              </div>

              <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="성함" 
                  required 
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "15px", padding: "1.2rem 1.5rem", color: "#fff", fontSize: "1.1rem" }} 
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="연락처" 
                  required 
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "15px", padding: "1.2rem 1.5rem", color: "#fff", fontSize: "1.1rem" }} 
                />
                <select 
                  name="interest" 
                  required 
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "15px", padding: "1.2rem 1.5rem", color: "#fff", fontSize: "1.1rem" }}
                >
                  <option value="">관심 분야 선택</option>
                  <option value="shorts">고효율 쇼츠 제작</option>
                  <option value="storytelling">브랜드 스토리텔링</option>
                  <option value="automation">자동화 영상 시스템</option>
                </select>
                <textarea 
                  name="message" 
                  placeholder="추가 요청 사항 (선택)" 
                  rows={4} 
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "15px", padding: "1.2rem 1.5rem", color: "#fff", fontSize: "1.1rem", resize: "none" }} 
                />
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ marginTop: "1rem", padding: "1.5rem", fontSize: "1.2rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}
                >
                  <Send size={20} /> 신청 완료하기
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
