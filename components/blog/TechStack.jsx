"use client";
import { useState } from 'react';

const TechStack = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const skills = {
    frontend: [
      { 
        name: "React", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "컴포넌트 기반 UI 개발, React Hooks, 상태 관리 등에 능숙합니다."
      },
      { 
        name: "JavaScript", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        description: "ES6+, 비동기 프로그래밍, 함수형 프로그래밍에 익숙합니다."
      },
      { 
        name: "TypeScript", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        description: "타입 안전성을 갖춘 코드 작성 및 인터페이스 설계가 가능합니다."
      },
      { 
        name: "Jest", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
        description: "컴포넌트 테스팅, 유닛 테스트 작성에 능숙합니다."
      },
      { 
        name: "HTML/CSS", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        description: "시맨틱 마크업, 반응형 디자인, CSS 애니메이션을 구현합니다."
      },
      { 
        name: "Material UI", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
        description: "MUI 컴포넌트 라이브러리를 활용한 UI 개발에 능숙합니다."
      }
    ],
    frameworks: [
      { 
        name: "Next.js", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        description: "서버 사이드 렌더링, 정적 사이트 생성 등 Next.js의 다양한 기능을 활용합니다."
      },
      { 
        name: "Redux", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        description: "복잡한 상태 관리와 미들웨어를 활용한 비동기 작업 처리가 가능합니다."
      },
      { 
        name: "React Query", 
        icon: "https://raw.githubusercontent.com/TanStack/query/main/media/emblem-light.svg",
        description: "서버 상태 관리 및 데이터 페칭에 최적화된 라이브러리를 활용합니다."
      }
    ],
    tools: [
      { 
        name: "Git", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        description: "버전 관리 및 협업 워크플로우에 능숙합니다."
      },
      { 
        name: "Webpack", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
        description: "모듈 번들링 및 최적화 설정이 가능합니다."
      },
      { 
        name: "VS Code", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        description: "효율적인 개발 환경 설정 및 확장 프로그램을 활용합니다."
      },
      { 
        name: "Figma", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        description: "디자인 시스템 이해 및 개발자-디자이너 협업에 능숙합니다."
      }
    ]
  };

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6 border border-base-200">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        기술 스택 및 전문 분야
      </h2>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'frontend'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('frontend')}
        >
          프론트엔드
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'frameworks'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('frameworks')}
        >
          프레임워크
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'tools'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('tools')}
        >
          개발 도구
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills[activeTab].map((skill) => (
          <div key={skill.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 p-1 mr-3 bg-gray-100 rounded-lg flex items-center justify-center">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-7 h-7"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/28?text=${skill.name.charAt(0)}`;
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold">{skill.name}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600">{skill.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4">업무 경험 분야</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "반응형 웹 개발", 
            "싱글 페이지 애플리케이션", 
            "크로스 브라우저 호환성", 
            "웹 성능 최적화", 
            "UI/UX 개선", 
            "컴포넌트 기반 설계",
            "RESTful API 연동",
            "모바일 퍼스트 디자인"
          ].map((area) => (
            <span key={area} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;