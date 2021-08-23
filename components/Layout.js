import Link from 'next/link';
import Head from 'next/head';
import Navbar from './common/Navbar';
import '../public/sass/index.scss';
import '../public/sass/login.scss';
import '../public/sass/auth_modal.scss';
import '../public/sass/navbar.scss';
import '../public/sass/profile.scss';
import '../public/sass/account.scss';
import '../public/sass/shop_profile.scss';
import '../public/sass/chatting.scss';

export default ({ children, title = 'Celeste'}) => (
  <div>
    <Head>
        <title>{ title } | Celeste</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name='defaultLanguage' content='en' />
        <meta name='availableLanguages' content='en' />
        <meta name="description" content="" />
        <meta name="robots" content="all,follow" />
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" 
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" 
            crossOrigin="anonymous"></link>
    </Head>

    <div>
        <Navbar></Navbar>
        {children}
    </div>
  </div>
);
