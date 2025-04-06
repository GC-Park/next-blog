"use client";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-content prose max-w-none prose-img:rounded-lg prose-pre:bg-base-200 prose-pre:text-base-content">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          // 각 마크다운 요소에 대한 커스텀 컴포넌트 정의
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mt-6 mb-4" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mt-5 mb-3" {...props} />
          ),
          p: ({ node, ...props }) => <p className="my-4" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-primary hover:underline" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-primary bg-base-200 p-4 my-4 italic"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 my-4" {...props} />
          ),
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code
                className="bg-base-200 px-1 py-0.5 rounded text-sm font-mono"
                {...props}
              />
            ) : (
              <code className="block bg-transparent p-0" {...props} />
            ),
          pre: ({ node, ...props }) => (
            <pre
              className="bg-base-200 p-4 rounded-lg my-4 overflow-x-auto"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img
              className="rounded-lg shadow-md max-w-full mx-auto my-4"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-base-300" {...props} />
          ),
          table: ({ node, ...props }) => (
            <table className="w-full border-collapse my-4" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="bg-base-200 border border-base-300 p-2 text-left"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-base-300 p-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
