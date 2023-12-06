import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" style={{bottom:0}}>
      <b className="b">
        <p className="p">(주)개버거</p>
        <p className="p">&nbsp;</p>
      </b>
      <div className="goei4559gmailcom">
        <p className="p">
          <b className="span">대표</b>
          <span className="span">{` 이선민 | `}</span>
          <b className="span">사업자번호</b>
          <span> 123-45-67890</span>
        </p>
        <p className="p">
          <b className="span">{`주소 `}</b>
          <span className="span">|</span>
          <b className="span">{` `}</b>
          <span>
            서울시 금천구 서부샛길 606 대성디폴리스지식산업센터 27층 어딘가
          </span>
        </p>
        <p className="p">
          <b className="span">메일</b>
          <span> | goei4559@gmail.com</span>
        </p>
      </div>
      <div className="div">이용 약관</div>
      <div className="div1">개인정보 처리방침</div>
    </div>
  );
}

export default Footer;