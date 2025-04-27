"use client";
import { useState } from 'react';

const LanguageInternationalExperience = () => {
  const [activeTab, setActiveTab] = useState('language');

  const languageSkills = [
    {
      language: "한국어",
      level: "모국어",
      icon: "🇰🇷",
      description: "모국어로 완벽한 의사소통 가능"
    },
    {
      language: "영어",
      level: "비즈니스 의사소통",
      certification: "OPIc IH (Intermediate High)",
      icon: "🇬🇧",
      description: "업무 환경에서 영어 의사소통 가능, 기술 문서 읽기/작성 가능"
    }
  ];

  const internationalExperiences = [
    {
      period: "현재",
      location: "독일",
      icon: "🇩🇪",
      title: "프론트엔드 개발자",
      description: "독일 기업에서 영어를 사용하여 국제 프로젝트 진행 중. 다국적 팀과 협업하며 웹 애플리케이션 개발."
    },
    {
      period: "2022.07 - 2022.08",
      location: "호주 브리즈번",
      icon: "🇦🇺",
      title: "James Cook University 어학연수",
      description: "국가에서 진행하는 사업으로 대학 내 교수님들과 인터뷰 및 브리즈번의 개발자 문화 탐구. 네이티브와 소통하며 한국 알리기 프로젝트 참여. A학점으로 수료."
    },
    {
      period: "2022.01",
      location: "미국 텍사스",
      icon: "🇺🇸",
      title: "University of Texas at Austin 어학연수",
      description: "Texas University에서 유치되는 어학연수 프로그램 참가. 매주 Report 작성 및 Speech 진행, 다양한 주제로 토론 참여. A학점으로 수료."
    },
    {
      period: "2021.07 - 2021.08",
      location: "미국 실리콘밸리",
      icon: "🇺🇸",
      title: "Silicon Valley Software Technology Program",
      description: "산호세 주립대학(SJSU)에서 진행하는 전공 수업 및 해커톤 프로그램. AI, Data Science 등 컴퓨터 관련 수업 참여. 팀 프로젝트 및 해커톤 참가하여 Second Prize 수상."
    },
    {
      period: "2019.05 - 2020.04",
      location: "캐나다 밴쿠버",
      icon: "🇨🇦",
      title: "워킹 홀리데이 및 어학연수",
      description: "iTTTi Vancouver 어학원 수료. 1년간 현지 생활 및 학습 경험을 통해 실질적인 영어 의사소통 능력 향상."
    }
  ];

  const globalCompetencies = [
    {
      title: "다국적 팀 협업",
      description: "다양한 문화적 배경을 가진 팀원들과 효과적으로 소통하고 협업하는 능력"
    },
    {
      title: "원격 협업 도구 활용",
      description: "GitHub, Slack, Jira 등의 도구를 활용한 글로벌 원격 협업 능력"
    },
    {
      title: "시차 극복 작업 관리",
      description: "다른 시간대에 있는 팀원들과 효율적으로 일하기 위한 일정 관리 및 비동기식 의사소통 전략"
    },
    {
      title: "기술 영어 의사소통",
      description: "개발 관련 기술적 내용을 영어로 명확하게 설명하고 이해하는 능력"
    },
    {
      title: "문화적 다양성 이해",
      description: "다양한 문화적 배경과 업무 스타일을 존중하고 적응하는 능력"
    }
  ];

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6 border border-base-200">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        외국어 능력 및 국제 협업 경험
      </h2>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'language'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('language')}
        >
          언어 능력
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'experience'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('experience')}
        >
          해외 경험
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'competencies'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('competencies')}
        >
          글로벌 역량
        </button>
      </div>


      {activeTab === 'language' && (
        <div className="space-y-6">
          {languageSkills.map((language) => (
            <div key={language.language} className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{language.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{language.language}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{language.level}</span>
                    {language.certification && (
                      <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {language.certification}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{language.description}</p>
            </div>
          ))}

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">현재 업무 환경</h4>
            <p className="text-gray-700">독일에서 프론트엔드 개발자로 근무 중이며, 업무는 영어로 진행합니다. 국제적인 팀과의 협업에서 영어로 의사소통하며 개발 업무를 수행하고 있습니다.</p>
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="space-y-6">
          {internationalExperiences.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 pb-6">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{exp.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <div className="text-sm text-gray-500">
                    {exp.location} | {exp.period}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'competencies' && (
        <div className="grid md:grid-cols-2 gap-4">
          {globalCompetencies.map((competency, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-2">{competency.title}</h3>
              <p className="text-sm text-gray-700">{competency.description}</p>
            </div>
          ))}
          
          <div className="md:col-span-2 mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">글로벌 업무 경험 요약</h4>
            <p className="text-gray-700">
              다양한 해외 경험을 통해 습득한 언어 능력과 문화적 이해를 바탕으로, 현재 독일에서 국제적인 환경에서 근무하며 다양한 배경을 가진 팀원들과 효과적으로 협업하고 있습니다. 
              다국적 팀 환경에서의 의사소통, 시차를 고려한 업무 조율, 그리고 문화적 차이를 존중하는 태도를 통해 글로벌 프로젝트에 기여하고 있습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageInternationalExperience;