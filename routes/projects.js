const projects = [
  {
    company: "CashFlows",
    projects: [
      {
        id: new ObjectId(),
        project: "Payr Reloaded, (Visa prepaid wallet)",
        link: "https://www.payrcard.com/payr",
        skills: "React, Redux, JavaScript, Jest, Enzyme & SASS",
        description:
          "Whilst at CashFlows I worked on a product called Payr Reloaded, a Visa prepaid wallet. We built the front-end in React/ JavaScript, SASS and Webpack. When I started with CashFlows some early development had already taken place on the project, but the site wasn’t responsive and only worked in Chrome. I took the site from here to a fully responsive SPA (Single Page Application). I introduced a test framework using Jest and Enzyme, added linting for the SASS and JavaScript, refactored and optimised the code and introduced new features. We worked in an agile manner managing our stories and tasks through Jira. Our Sprints worked in three-week cycles with sizing sessions, breakdown sessions and retrospectives.",
      },
    ],
  },
  {
    company: "BoilerJuice",
    projects: [
      {
        id: new ObjectId(),
        project: "Mobile First Site Rebuild, (Online Heating Oil Supplier)",
        link: "www.boilerjuice.com",
        skills: "JavaScript/ jQuery, Gulp, Browserify, Jasmine, Karma & SASS",
        description:
          "For this project I was tasked with re-building the front-end of the existing website. In places replicating the existing look and feel and in others introducing a new style and set of HTML templates. We completely re-wrote the JavaScript untangling many years of un-documented business logic and functionality.",
      },
    ],
  },
  {
    company: "Cambridge Assessment",
    projects: [
      {
        id: new ObjectId(),
        project: "Results Enquiries, (SPA exam result enquiries)",
        link: "forms.admissionstestingservice.org/form/tmua-candidate",
        skills: "JavaScript, CSS, Web Components",
        description:
          "This project utilises a schema driven UI concept pioneered by Cambridge Assessment. The main Web Component used is called ca-form which consumes a JSON formatted schema that in-turn builds the responsive HTML form. The initial Web Components were developed in ES5, we later refactored and ported the components to ES6. You can view this Open Source project here. https://github.com/cambridgeweblab/common-ui",
      },
    ],
  },
  {
    company: "Tribal Worldwide",
    projects: [
      {
        id: new ObjectId(),
        project: "Perfect Volkswagen, (Customise and build your perfect VW)",
        link: "https://perfect.volkswagen.co.uk",
        skills: "Backbone, Require, Jasmine, jQuery, HTML5, CSS3/SASS & Gulp",
        description:
          "My Perfect Volkswagen is a SPA built in Backbone using Require to manage modules, SASS for the CSS and Gulp to manage the client-side files. I was responsible for adding new features and introducing unit testing using Jasmine.",
      },
      {
        id: new ObjectId(),
        project: "Avios Group, (Marketing site)",
        link: "https://aviosgroup.com/",
        skills: "Node, Express, Handlebars, CSS3, JavaScript/ jQuery, Gulp",
        description:
          "Avios Group is a Mobile First Responsive website I worked on whilst at Tribal Worldwide. It's built using Node, Express, Handlebars, CSS3 and Gulp to manage the client-side files.",
      },
    ],
  },
  {
    company: "Millimetre Media",
    projects: [
      {
        id: new ObjectId(),
        project: "Helix Property, (Portfolio and company bio)",
        link: "http://www.helixproperty.co.uk/",
        skills: "JavaScript, Browserify, CSS, PHP, Gulp",
        description:
          "I was the sole Front-end Developer on this project. I used a Mobile First Responsive approach, using HTML5, CSS3 JavaScript/ jQuery and Browserify to manage my modules with Gulp to manage the front-end workflow.",
      },
    ],
  },
  {
    company: "m.lastminute.com",
    projects: [
      {
        id: new ObjectId(),
        project: "m.lastminute.com, (Response mobile focused travel site)",
        link: "http://m.lastminute.com",
        skills: "Backbone, JavaScript, Jasmine, Require, Grunt",
        description:
          "Whilst working for lastminute.com I worked on two specific projects. For the first project I created an HTML5, LESS/ CSS3 & JavaScript mobile-first responsive search form component that used the Bootstrap framework for the underlying grid and basic styling.",
      },
      {
        id: new ObjectId(),
        project: "Responsive Search Forms, (Component based site search forms)",
        link: "http://www.lastminute.com",
        skills: "JavaScript, HTML, CSS, Require, Grunt",
        description:
          "Whilst working for lastminute.com I worked on two specific projects. For the first project I created an HTML5, LESS/ CSS3 & JavaScript mobile-first responsive search form component that used the Bootstrap framework for the underlying grid and basic styling.",
      },
    ],
  },
  {
    company: "Bauer Media",
    projects: [
      {
        id: new ObjectId(),
        project: "Closer Magazine, (Mobile First online magazine)",
        link: "http://www.closeronline.co.uk",
        skills: "JavaScript, Backbone, Jasmine, Require",
        description:
          "I was employed by Bauer Media to work across two teams, the UI Team and the Back end CMS Team. In the UI team I contributed towards the development of the responsive front-end build of the new Closer Magazine online edition creating responsive HTML/CSS page templates.",
      },
    ],
  },
  {
    company: "Rank Interactive",
    projects: [
      {
        id: new ObjectId(),
        project: "Blue Star, (Sports book)",
        link: "http://joe-burton.com/bluestar/",
        skills: "Backbone, JavaScript, Jasmine, Require",
        description:
          "I was responsible for managing a team of Front-end Developers in the responsive rebuild of bluesq.com. This involved creating an HTML5, LESS/ CSS and JavaScript framework that worked across mobile, tablet and desktop. I was also responsible on a day-to-day basis for managing the production of HTML prototypes to demonstrate different ideas from the UX Team.",
      },
    ],
  },
  {
    company: "Engine",
    projects: [
      {
        id: new ObjectId(),
        project: "Fabulous Magazine, (The Sun's online gossib rag)",
        link: "http://fabulousmag.co.uk",
        skills: "HTML5, CSS3, JavaScript/jQuery",
        description:
          "I worked for Jam @ The Engine Group in Soho as a Mobile Front-end Developer building HTML5, CSS3, JavaScript/jQuery smart-phone and desktop websites. This contract was a great opportunity to develop my Mobile development skills working on the mobile version of the fabulous magazine http://fabulousmag.co.uk and several small Sky mobile promotional sites.",
      },
    ],
  },
  {
    company: "SapientNitro",
    projects: [
      {
        id: new ObjectId(),
        project: "John Lewis, (Full site rebuild)",
        link: "http://www.johnlewis.com",
        skills: "HTML5, CSS3, JavaScript/jQuery",
        description:
          "Whilst working for Sapient on this contract I was based client side at John Lewis, working in a team of Front-end Developers in an Agile Software Development Environment. I was responsible for creating well structured JavaScript/jQuery functionality and clean HTML/CSS template components keeping all code as re-usable and standards compliant as possible. We introduced HTML5 and CSS3 to the project using a progressive enhancement approach so as not to limit the site to just the latest browsers.",
      },
    ],
  },
];

module.exports = projects;
