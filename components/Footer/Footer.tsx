import css from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Maria Khomynets</p>
          <p>
            Contact us:
            <a href="mailto:maria.khomynets@notehub.app">
              maria.khomynets@notehub.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
