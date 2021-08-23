import Link from "next/link";
import Head from "next/head";

export default ({ children, title = "Celeste" }) => (
  <div>
    <Head>
      <title>{title} | Celeste</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="defaultLanguage" content="en" />
      <meta name="availableLanguages" content="en" />
      <meta name="description" content="" />
      <meta name="robots" content="all,follow" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="/images/favicon.ico"
      />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
      <link rel="stylesheet" href="/css/index.css" />
      <link rel="stylesheet" href="/css/login.css" />
      <link rel="stylesheet" href="/css/navbar.css" />
      <link rel="stylesheet" href="/css/create-profile.css" />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossorigin="anonymous"
      />
    </Head>

    <div>
      <nav className="navbar navbar-expand-lg navbar-light container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link href="/artist/landing">
          <a className="navbar-brand">LOGO</a>
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link href="/artist/landing">
                <a className="nav-link">Become an artist</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/artist/login">
                <a className="nav-link">Log in</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/artist/signup">
                <a className="nav-link">Sign Up</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </div>
  </div>
);
