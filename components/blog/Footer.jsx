const Footer = () => {
  return (
    <div className="text-center text-gray-500 text-sm py-6">
      <p>© {new Date().getFullYear()} GC-Park. 피드백이 있다면 언제든지 연락 주세요!</p>
      <p className="mt-1">감사합니다. 오늘도 좋은 하루 보내세요 :)</p>
    </div>
  );
};

export default Footer;