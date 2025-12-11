"use client";

import { teamMembers } from "@/data/team";

export default function TeamSection() {
  return (
    <>
      <div className="body1">
        {teamMembers.map((member) => (
          <div key={member.name} className={`person person-${member.position}`}>
            <div className="person-content">
              <div className="container1">
                <div className="container-inner">
                  <div className="circle"></div>
                  <img
                    className={`img ${member.imageClass}`}
                    src={member.image}
                    alt={member.name}
                  />
                </div>
              </div>
              <div className="bio-text">
                <h3>{member.bioTitle}</h3>
                <p>{member.bioText}</p>
              </div>
              <div className="divider"></div>
              <div className="name">{member.name}</div>
              <div className="title">
                {member.role}
                <br />
                {member.roleSecondLine}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .body1 {
          align-items: flex-start;
          background-color: #ffffff;
          display: flex;
          font-family: "Poppins", sans-serif;
          flex-wrap: wrap;
          justify-content: center;
          height: auto;
          gap: 20px;
          padding: 40px 20px;
        }
        .person {
          align-items: flex-start;
          display: flex;
          flex-direction: row;
          position: relative;
        }
        .person-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 340px;
          position: relative;
        }
        .container1 {
          border-radius: 50%;
          height: 400px;
          -webkit-tap-highlight-color: transparent;
          transform: scale(0.60);
          transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
          width: 400px;
          margin-bottom: -39px;
          cursor: pointer;
        }
        .container1:hover {
          transform: scale(0.66);
        }
        .container-inner {
          clip-path: path(
            "M 390,400 C 390,504.9341 304.9341,590 200,590 95.065898,590 10,504.9341 10,400 V 10 H 200 390 Z"
          );
          position: relative;
          transform-origin: 50%;
          top: -200px;
        }
        .circle {
          background-color: #D4F4E8;
          border-radius: 50%;
          height: 380px;
          left: 10px;
          pointer-events: none;
          position: absolute;
          top: 210px;
          width: 380px;
        }
        .img {
          pointer-events: none;
          position: relative;
          transform: translateY(20px) scale(1.15);
          transform-origin: 50% bottom;
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .container1:hover .img {
          transform: translateY(0) scale(1.2);
        }
        .img1 {
          left: 22px;
          top: 174px;
          width: 340px;
        }
        .img2 {
          left: -6px;
          top: 160px;
          width: 444px;
        }
        .divider {
          background-color: #BAD6EB;
          height: 1px;
          width: 160px;
          margin-bottom: 16px;
        }
        .name {
          color: #404245;
          font-size: 36px;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 14px;
          text-align: center;
        }
        .title {
          color: #333;
          font-family: "Poppins", sans-serif;
          font-size: 1rem;
          text-align: center;
          font-weight: 300;
          margin-top: 0;
          min-height: 40px;
          line-height: 1.6;
        }
        .bio-text {
          position: absolute;
          top: 0;
          width: 280px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          opacity: 0;
          transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 10;
          white-space: pre-line;
        }
        .bio-text h3 {
          font-size: 18px;
          font-weight: 600;
          color: #404245;
          margin: 0 0 12px 0;
        }
        .bio-text p {
          font-size: 14px;
          line-height: 1.6;
          color: #404245;
          margin: 0;
        }
        .person-left .bio-text {
          right: 100%;
          margin-right: 30px;
          transform: translateX(20px);
        }
        .person-right .bio-text {
          left: 100%;
          margin-left: 30px;
          transform: translateX(-20px);
        }
        .container1:hover ~ .bio-text {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1) 300ms, transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 300ms;
        }
        @media (max-width: 1200px) {
          .bio-text {
            display: none;
          }
        }
        @media (max-width: 767px) {
          .body1 {
            align-items: center;
            background-color: #f2f2f2;
            display: flex;
            font-family: "Poppins", sans-serif;
            flex-wrap: wrap;
            justify-content: center;
            height: 100%;
            gap: 0px;
          }
        }
      `}</style>
    </>
  );
}
