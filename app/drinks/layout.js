export default function DrinksLayout({ children }) {
  return (
    <div className="max-w-xl ">
      <div className="mockup-code mb-8">
        <pre data-prefix="$">
          <code>npx create-next-app@14 patrick-blog</code>
        </pre>
      </div>
      {children}
    </div>
  );
}
