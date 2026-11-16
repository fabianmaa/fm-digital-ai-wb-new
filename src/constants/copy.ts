/**
 * FM Digital AI — single source of truth for every customer-facing string.
 *
 * Architecture: one entry per string, with both language values side by side.
 * Components never hardcode copy; they read it from `useLanguage().t`.
 * Bracketed text inside a headline, e.g. [like this], is rendered as the
 * accented phrase (italic + clay underline) by the <RichText> component.
 */

export type Lang = "en" | "es";

const s = (en: string, es: string) => ({ en, es });

export const copy = {
  site: {
    name: s("FM Digital AI", "FM Digital AI"),
    tagline: s(
      "More customers answered. In English and Spanish.",
      "Más clientes atendidos. En inglés y en español.",
    ),
    location: s("Orlando, Florida", "Orlando, Florida"),
    areaShort: s("Central Florida", "Florida Central"),
    logoArea: s("Central Florida", "Florida Central"),
  },

  nav: {
    services: s("Services", "Servicios"),
    process: s("Our process", "Nuestro proceso"),
    work: s("Our work", "Nuestro trabajo"),
    about: s("About", "Nosotros"),
    freeAudit: s("Free audit", "Auditoría gratis"),
    menuOpen: s("Open menu", "Abrir menú"),
    menuClose: s("Close menu", "Cerrar menú"),
    mainNav: s("Main navigation", "Navegación principal"),
    skipToContent: s("Skip to content", "Ir al contenido"),
    home: s("Home", "Inicio"),
    languageLabel: s("Site language", "Idioma del sitio"),
    switchToEs: s("View in Spanish", "Ver en español"),
    switchToEn: s("View in English", "Ver en inglés"),
    currentEn: s("English", "English"),
    currentEs: s("Español", "Español"),
  },

  common: {
    freeAudit: s("Get my free audit", "Quiero mi auditoría gratis"),
    freeAuditShort: s("Free audit", "Auditoría gratis"),
    auditMicro: s(
      "Free · 30 minutes · No obligation",
      "Gratis · 30 minutos · Sin compromiso",
    ),
    auditMicroLong: s(
      "Free · 30 minutes · A written plan you can keep",
      "Gratis · 30 minutos · Un plan por escrito que puedes conservar",
    ),
    howItWorks: s("See how it works", "Ver cómo funciona"),
    seeProcess: s("See our process", "Conoce nuestro proceso"),
    seeWork: s("See our work", "Ver nuestro trabajo"),
    seeAllServices: s("See all services", "Ver todos los servicios"),
    learnMore: s("Learn more", "Saber más"),
    backHome: s("Back to home", "Volver al inicio"),
    englishAndSpanish: s("English & Spanish", "Inglés y español"),
    basedInOrlando: s("Based in Orlando", "Con base en Orlando"),
    bilingualByDesign: s("Bilingual by design", "Bilingüe por diseño"),
    serviceArea: s("Service area", "Zona de servicio"),
    getInTouch: s("Get in touch", "Contacto"),
    faq: s("Common questions", "Preguntas frecuentes"),
    close: s("Close", "Cerrar"),
    open: s("Open", "Abrir"),
    required: s("Required", "Obligatorio"),
    optional: s("Optional", "Opcional"),
    home: s("Home", "Inicio"),
    notFoundTitle: s("Page not found", "Página no encontrada"),
  },

  footer: {
    blurb: s(
      "A Central Florida studio helping local businesses answer more customers, in English and Spanish. No jargon, no runaround, no extra staff required.",
      "Un estudio de Florida Central que ayuda a los negocios locales a atender a más clientes, en inglés y en español. Sin tecnicismos, sin vueltas y sin que tengas que contratar más personal.",
    ),
    servicesTitle: s("What we do", "Lo que hacemos"),
    companyTitle: s("Company", "Compañía"),
    legalTitle: s("Legal", "Legal"),
    contactTitle: s("Start here", "Empieza aquí"),
    contactLine: s(
      "The fastest way to reach us is the free audit form.",
      "La forma más rápida de contactarnos es el formulario de auditoría gratis.",
    ),
    blog: s("Blog", "Blog"),
    privacy: s("Privacy policy", "Política de privacidad"),
    terms: s("Terms of service", "Términos del servicio"),
    sitemap: s("Sitemap", "Mapa del sitio"),
    rights: s("All rights reserved.", "Todos los derechos reservados."),
    madeIn: s("Made in Orlando, Florida.", "Hecho en Orlando, Florida."),
    areaNote: s(
      "Serving Orlando, Kissimmee, Groveland, Clermont, Winter Garden, St. Cloud, Davenport and nearby.",
      "Atendemos Orlando, Kissimmee, Groveland, Clermont, Winter Garden, St. Cloud, Davenport y alrededores.",
    ),
  },

  form: {
    title: s("Request your free audit", "Solicita tu auditoría gratis"),
    intro: s(
      "Two required fields. The rest helps us come prepared.",
      "Solo dos campos obligatorios. Lo demás nos ayuda a llegar preparados.",
    ),
    name: s("Full name", "Nombre completo"),
    namePlaceholder: s("María González", "María González"),
    email: s("Email", "Correo electrónico"),
    emailPlaceholder: s("maria@yourbusiness.com", "maria@tunegocio.com"),
    phone: s("Phone", "Teléfono"),
    phonePlaceholder: s("(407) 555-0134", "(407) 555-0134"),
    website: s("Website", "Sitio web"),
    websitePlaceholder: s("yourbusiness.com", "tunegocio.com"),
    message: s("What is taking up the most time?", "¿Qué es lo que más tiempo te quita?"),
    messagePlaceholder: s(
      "For example: calls after 5 p.m., no-shows on Mondays, messages we answer at night…",
      "Por ejemplo: llamadas después de las 5 p.m., ausencias los lunes, mensajes que contestamos de noche…",
    ),
    submit: s("Send my request", "Enviar mi solicitud"),
    submitting: s("Sending…", "Enviando…"),
    requiredNote: s(
      "We only need your name and email.",
      "Solo necesitamos tu nombre y tu correo.",
    ),
    successTitle: s("Got it. Thank you.", "Recibido. Gracias."),
    successBody: s(
      "We will reply to schedule your free audit. If you added a phone number, tell us in your message the best time to call.",
      "Te responderemos para agendar tu auditoría gratis. Si agregaste un teléfono, cuéntanos en el mensaje cuál es el mejor momento para llamarte.",
    ),
    errorTitle: s("We could not send it.", "No pudimos enviarlo."),
    errorBody: s(
      "Something went wrong on our side. Please try again in a moment.",
      "Algo falló de nuestro lado. Inténtalo de nuevo en un momento.",
    ),
    honeypot: s(
      "Something went wrong. Please try again.",
      "Algo salió mal. Inténtalo de nuevo.",
    ),
    sendingLabel: s("Sending your request", "Enviando tu solicitud"),
    privacyNote: s(
      "We use your details only to reply about your audit. No lists, no spam.",
      "Usamos tus datos solo para responderte sobre tu auditoría. Sin listas, sin spam.",
    ),
  },

  home: {
    hero: {
      eyebrow: s("Central Florida · English & Spanish", "Florida Central · Inglés y español"),
      title: s(
        "Never lose a customer because nobody [answered.]",
        "No pierdas un cliente porque nadie [contestó.]",
      ),
      lead: s(
        "We help clinics, restaurants and local businesses across Central Florida answer every call and message, fill their calendars, and get found first — so the business keeps growing. In English and in Spanish.",
        "Ayudamos a clínicas, restaurantes y negocios locales en Florida Central a contestar cada llamada y mensaje, llenar su agenda y aparecer primero en las búsquedas — para que el negocio siga creciendo. En inglés y en español.",
      ),
      cta: s("Get my free audit", "Quiero mi auditoría gratis"),
      secondary: s("See how it works", "Ver cómo funciona"),
      micro: s(
        "Free · 30 minutes · No obligation",
        "Gratis · 30 minutos · Sin compromiso",
      ),
      proofContact: s("One point of contact", "Un solo punto de contacto"),
      proofBilingual: s("Bilingual by design", "Bilingüe por diseño"),
      proofLocal: s("Based in Orlando", "Con base en Orlando"),
      photoAlt: s(
        "A café owner smiling behind the counter of her shop",
        "Una dueña de cafetería sonriendo detrás del mostrador de su negocio",
      ),
      cardLabel: s("New message · 7:42 pm", "Mensaje nuevo · 7:42 p.m."),
      cardMessage: s(
        "Hi! Do you have anything tomorrow morning?",
        "¡Hola! ¿Tienen algo mañana por la mañana?",
      ),
      cardReply: s(
        "Good morning! We have 10:30 a.m. open. Shall I book it for you?",
        "¡Buenos días! A las 10:30 a.m. tenemos un espacio libre. ¿Te lo reservo?",
      ),
      cardTag: s("Answered in English", "Contestado en español"),
      cardNote: s("While the owner was with a customer", "Mientras la dueña atendía a un cliente"),
      captions: [
        s(
          "Busy with a customer. The phone keeps ringing.",
          "Ocupada con un cliente. El teléfono no deja de sonar.",
        ),
        s(
          "Answered anyway. In English and in Spanish.",
          "Contestado de todos modos. En inglés y en español.",
        ),
        s(
          "Every table full — because every call was answered.",
          "Cada mesa llena — porque cada llamada fue contestada.",
        ),
        s(
          "Behind it all: AI answering, booking, and following up — while you run your business.",
          "Detrás de todo: la IA contesta, agenda y hace seguimiento — mientras tú atiendes tu negocio.",
        ),
      ],
      activity: [
        s("Incoming call…", "Llamada entrante…"),
        s("Answered · English & Spanish", "Contestado · Inglés y español"),
        s("Table booked", "Mesa reservada"),
        s("AI handling follow-ups", "La IA gestiona los seguimientos"),
      ],
    },

    pain: {
      eyebrow: s("Sound familiar?", "¿Te suena?"),
      title: s("The customer who left [without a sound.]", "El cliente que se fue [sin hacer ruido.]"),
      intro: s(
        "Most lost business does not announce itself. It quietly books somewhere else.",
        "La mayoría de los clientes perdidos no avisan. Simplemente reservan en otro lado.",
      ),
      after: s("It quietly books with you.", "Simplemente reservan contigo."),
      items: [
        {
          title: s("It is 7:40 p.m. and the phone rings.", "Son las 7:40 p.m. y suena el teléfono."),
          body: s(
            "The office is closed. By 9 a.m., that patient has booked with the practice down the street.",
            "La oficina está cerrada. A las 9 a.m., ese paciente ya reservó con la clínica de la esquina.",
          ),
        },
        {
          title: s("A message waits three hours.", "Un mensaje espera tres horas."),
          body: s(
            "By the time someone replies, the customer has already chosen the business that answered in minutes.",
            "Para cuando alguien responde, el cliente ya eligió al negocio que contestó en minutos.",
          ),
        },
        {
          title: s(
            "You are the owner, the receptionist and the marketing department.",
            "Eres el dueño, la recepcionista y el departamento de marketing.",
          ),
          body: s(
            "The paperwork follows you home. Sunday disappears into reminders and follow-ups.",
            "El papeleo te sigue a casa. El domingo se va en recordatorios y seguimientos.",
          ),
        },
        {
          title: s(
            "The competitor shows up first on Google Maps.",
            "El competidor aparece primero en Google Maps.",
          ),
          body: s(
            "You may be better. But they are easier to find — and that is who gets the call.",
            "Puede que seas mejor. Pero a él es más fácil encontrarlo — y él se lleva la llamada.",
          ),
        },
      ],
      closing: s(
        "None of this is a technology problem. It is an attention problem. We fix it without adding staff.",
        "Nada de esto es un problema de tecnología. Es un problema de atención. Lo resolvemos sin que tengas que contratar más personal.",
      ),
    },

    services: {
      eyebrow: s("What we do", "Lo que hacemos"),
      title: s(
        "Four ways to keep the customers you already earn.",
        "Cuatro formas de conservar a los clientes que ya te eligen.",
      ),
      intro: s(
        "Every service starts with the same question: where are you losing people? Then we build the smallest fix that works.",
        "Todo servicio empieza con la misma pregunta: ¿dónde estás perdiendo clientes? Después construimos la solución más pequeña que funciona.",
      ),
      items: [
        {
          key: "agents",
          number: "01",
          kicker: s("Answer every customer", "Contesta a cada cliente"),
          title: s("Calls and messages answered, day or night.", "Llamadas y mensajes contestados, de día o de noche."),
          body: s(
            "Calls, texts and messages answered in English and Spanish, appointments booked, questions handled — while you are with a patient, in the kitchen or asleep.",
            "Llamadas, mensajes de texto y redes sociales contestados en inglés y español, citas agendadas y preguntas resueltas — mientras atiendes a un paciente, estás en la cocina o duermes.",
          ),
          bullets: [
            s("A real conversation, not a phone tree", "Una conversación real, no un menú telefónico"),
            s(
              "Hands the conversation to your team when a person is needed",
              "Pasa la conversación a tu equipo cuando hace falta una persona",
            ),
          ],
          link: s("How it works", "Cómo funciona"),
        },
        {
          key: "followup",
          number: "02",
          kicker: s("Follow up automatically", "Da seguimiento automático"),
          title: s("The follow-up you never have time for.", "El seguimiento para el que nunca tienes tiempo."),
          body: s(
            "Reminders, review requests and check-ins that keep your calendar full and your no-shows down — written in your voice.",
            "Recordatorios, solicitudes de reseña y mensajes de seguimiento que mantienen tu agenda llena y reducen las ausencias — escritos con tu voz.",
          ),
          bullets: [
            s("Reminders that sound like you wrote them", "Recordatorios que suenan como si los hubieras escrito tú"),
            s("Review requests sent at the right moment", "Solicitudes de reseña enviadas en el momento justo"),
          ],
          link: s("How it works", "Cómo funciona"),
        },
        {
          key: "found",
          number: "03",
          kicker: s("Be found first", "Que te encuentren primero"),
          title: s("Be the first name people find.", "Sé el primer nombre que encuentran."),
          body: s(
            "Show up when neighbors search in English or Spanish, with a profile, reviews and pages that make choosing you easy.",
            "Aparece cuando tus vecinos buscan en inglés o en español, con un perfil, reseñas y páginas que hacen fácil elegirte.",
          ),
          bullets: [
            s("Your Google profile, cleaned up and kept current", "Tu perfil de Google, ordenado y al día"),
            s("Pages written for both languages", "Páginas escritas para los dos idiomas"),
          ],
          link: s("How it works", "Cómo funciona"),
        },
        {
          key: "tools",
          number: "04",
          kicker: s("Tools that fit", "Herramientas a tu medida"),
          title: s("Tools built around your business.", "Herramientas hechas para tu negocio."),
          body: s(
            "Simple tools for the way you actually work. You do not pay for features you will never use.",
            "Herramientas simples para la forma en que realmente trabajas. No pagas por funciones que nunca vas a usar.",
          ),
          bullets: [
            s("Quotes, bookings or intake in one place", "Cotizaciones, reservas o registros en un solo lugar"),
            s("Built to fit, not to upsell", "Hechas para encajar, no para venderte más"),
          ],
          link: s("How it works", "Cómo funciona"),
        },
      ],
    },

    process: {
      eyebrow: s("How it works", "Cómo funciona"),
      title: s("Simple for you. Serious about the details.", "Simple para ti. Serio con los detalles."),
      intro: s(
        "You do not need a project manager, a new app, or a monthly meeting you dread.",
        "No necesitas un gerente de proyecto, una aplicación nueva ni una reunión mensual que te dé pereza.",
      ),
      steps: [
        {
          number: "01",
          title: s("We talk. You talk. No jargon.", "Conversamos. Tú hablas. Sin tecnicismos."),
          body: s(
            "A 30-minute conversation about your week: where customers come from, where they slip away, and what eats your time.",
            "Una conversación de 30 minutos sobre tu semana: de dónde llegan los clientes, dónde se pierden y qué te quita el tiempo.",
          ),
        },
        {
          number: "02",
          title: s("You get a plain-English plan.", "Recibes un plan en palabras simples."),
          body: s(
            "A short written plan: what we would fix first, what it costs, and what you can expect. Yours to keep, even if we never work together.",
            "Un plan breve por escrito: qué arreglaríamos primero, cuánto cuesta y qué puedes esperar. Es tuyo, aunque nunca trabajemos juntos.",
          ),
        },
        {
          number: "03",
          title: s("We build it and set it up.", "Lo construimos y lo configuramos."),
          body: s(
            "We handle the setup, the wording in both languages and the testing. You keep running your business.",
            "Nos encargamos de la configuración, los textos en los dos idiomas y las pruebas. Tú sigues atendiendo tu negocio.",
          ),
        },
        {
          number: "04",
          title: s("We watch it and improve it.", "Lo revisamos y lo mejoramos."),
          body: s(
            "Every month we review what is working, adjust what is not, and send you a short update you can read in two minutes.",
            "Cada mes revisamos lo que funciona, ajustamos lo que no y te enviamos una actualización breve que puedes leer en dos minutos.",
          ),
        },
      ],
    },

    sectors: {
      eyebrow: s("Who we help", "A quién ayudamos"),
      title: s(
        "Built for the businesses that make Central Florida feel like home.",
        "Hecho para los negocios que hacen que Florida Central se sienta como casa.",
      ),
      intro: s(
        "If your customers call, message or search before they buy, we can help.",
        "Si tus clientes llaman, escriben o buscan antes de comprar, podemos ayudarte.",
      ),
      items: [
        {
          name: s("Clinics, dental & chiropractic", "Clínicas, odontología y quiropráctica"),
          line: s(
            "Fuller schedules, fewer no-shows, and a front desk that is not glued to the phone.",
            "Agendas más llenas, menos ausencias y una recepción que no vive pegada al teléfono.",
          ),
          image: "clinic-doctor",
          alt: s("A doctor holding a clipboard in a bright office", "Un médico con una tablilla en una oficina luminosa"),
        },
        {
          name: s("Restaurants & hospitality", "Restaurantes y hospitalidad"),
          line: s(
            "Reservations and questions handled while the kitchen is at its busiest.",
            "Reservas y preguntas resueltas mientras la cocina está en su momento más ocupado.",
          ),
          image: "restaurant-kitchen",
          alt: s("An open restaurant kitchen during service", "Una cocina de restaurante abierta durante el servicio"),
        },
        {
          name: s("Real estate", "Bienes raíces"),
          line: s(
            "Every inquiry answered and followed up, even during a closing.",
            "Cada consulta contestada y con seguimiento, incluso en medio de un cierre.",
          ),
          image: "real-estate-home",
          alt: s("A family home with a brick porch", "Una casa familiar con porche de ladrillo"),
        },
        {
          name: s("Accountants & professional services", "Contadores y servicios profesionales"),
          line: s(
            "Client questions answered and documents collected without the back-and-forth.",
            "Preguntas de clientes resueltas y documentos reunidos sin tanto ida y vuelta.",
          ),
          image: "office-professional",
          alt: s("A professional smiling at her desk", "Una profesional sonriendo en su escritorio"),
        },
        {
          name: s("Local services & tourism", "Servicios locales y turismo"),
          line: s(
            "Quotes, bookings and directions in the language your customer speaks.",
            "Cotizaciones, reservas e indicaciones en el idioma que habla tu cliente.",
          ),
          image: "barber-local",
          alt: s("A barber at work in his shop", "Un barbero trabajando en su local"),
        },
      ],
      footer: s(
        "Based in Orlando. Working across Kissimmee, Groveland, Clermont, Winter Garden, St. Cloud, Davenport and nearby.",
        "Con base en Orlando. Trabajamos en Kissimmee, Groveland, Clermont, Winter Garden, St. Cloud, Davenport y alrededores.",
      ),
    },

    studio: {
      eyebrow: s("A local studio", "Un estudio local"),
      title: s("A Central Florida studio, not a call center.", "Un estudio de Florida Central, no un call center."),
      body: s(
        "FM Digital AI is a small studio in Orlando. We work with clinics, restaurants and local businesses across Central Florida — with one point of contact, plain language and a written plan before anything starts.",
        "FM Digital AI es un estudio pequeño en Orlando. Trabajamos con clínicas, restaurantes y negocios locales de toda Florida Central — con un solo punto de contacto, palabras simples y un plan por escrito antes de empezar.",
      ),
      points: [
        s(
          "One point of contact from the first call to the last adjustment.",
          "Un solo punto de contacto desde la primera llamada hasta el último ajuste.",
        ),
        s("Plain language, in English or Spanish.", "Palabras simples, en inglés o en español."),
        s("A written plan before anything starts.", "Un plan por escrito antes de empezar."),
      ],
      noteTitle: s("How we work", "Cómo trabajamos"),
      note: s(
        "We keep the work simple and the promises real: answer every customer, explain every step, and put the plan in writing before we build. No layers, no hand-offs, no jargon — in English or in Spanish.",
        "Mantenemos el trabajo simple y las promesas reales: contestar a cada cliente, explicar cada paso y poner el plan por escrito antes de construir. Sin capas, sin traspasos y sin tecnicismos — en inglés o en español.",
      ),
      signature: s("The FM Digital AI team", "El equipo de FM Digital AI"),
      photoAlt: s("The FM Digital AI team working together", "El equipo de FM Digital AI trabajando juntos"),
      image: "team-notes",
      more: s("More about us", "Conoce más de nosotros"),
    },

    work: {
      eyebrow: s("Selected work", "Trabajo seleccionado"),
      title: s("Work we are glad to put our name on.", "Trabajo que nos enorgullece firmar."),
      intro: s(
        "Two projects that show how we think: understand the business first, then build only what it needs.",
        "Dos proyectos que muestran cómo pensamos: primero entender el negocio, después construir solo lo que necesita.",
      ),
      cards: [
        {
          project: s("Aula Pro", "Aula Pro"),
          kind: s("Online education · Spanish & English", "Educación en línea · Español e inglés"),
          title: s("One course platform that speaks both languages.", "Una plataforma de cursos que habla dos idiomas."),
          body: s(
            "Aula Pro needed one place to sell and deliver courses to students in Latin America and the United States. We built the site, the course catalog and the enrollment flow in both languages.",
            "Aula Pro necesitaba un solo lugar para vender y entregar cursos a estudiantes de América Latina y Estados Unidos. Construimos el sitio, el catálogo de cursos y el proceso de inscripción en los dos idiomas.",
          ),
          points: [
            s("One catalog, two languages", "Un catálogo, dos idiomas"),
            s("Enrollment without back-and-forth emails", "Inscripción sin correos de ida y vuelta"),
          ],
          image: "office-professional",
          alt: s("A professional working at her desk", "Una profesional trabajando en su escritorio"),
        },
        {
          project: s("Expert Path", "Expert Path"),
          kind: s("Professional training", "Formación profesional"),
          title: s("A clearer path from visitor to student.", "Un camino más claro del visitante al estudiante."),
          body: s(
            "Expert Path had the courses and the expertise; the website made them hard to find. We rebuilt the program pages and the way students find, compare and enroll.",
            "Expert Path tenía los cursos y la experiencia; el sitio web los hacía difíciles de encontrar. Reconstruimos las páginas de programas y la forma en que los estudiantes buscan, comparan y se inscriben.",
          ),
          points: [
            s("Programs organized around what students search for", "Programas organizados según lo que buscan los estudiantes"),
            s("A simpler enrollment path", "Un proceso de inscripción más simple"),
          ],
          image: "team-notes",
          alt: s("Colleagues reviewing notes together at a table", "Colegas revisando notas juntos en una mesa"),
        },
      ],
      note: s(
        "Results depend on each business. We do not publish numbers we cannot prove — and we are happy to walk you through the work behind every project we mention.",
        "Los resultados dependen de cada negocio. No publicamos cifras que no podemos demostrar — y con gusto te mostramos el trabajo detrás de cada proyecto que mencionamos.",
      ),
      more: s("See the full work", "Ver todo el trabajo"),
    },

    faq: {
      eyebrow: s("Questions", "Preguntas"),
      title: s("The things owners ask us first.", "Lo que los dueños nos preguntan primero."),
      items: [
        {
          q: s("Do I need to know anything about technology?", "¿Necesito saber de tecnología?"),
          a: s(
            "No. That is our job. You tell us how your business works; we handle the rest and explain it in plain language.",
            "No. Eso es lo nuestro. Tú nos cuentas cómo funciona tu negocio; nosotros nos encargamos del resto y te lo explicamos en palabras simples.",
          ),
        },
        {
          q: s("How much does it cost?", "¿Cuánto cuesta?"),
          a: s(
            "It depends on what you need. After the free audit you get a written plan with a fixed price, before anything starts. If it does not make sense for your business, we will tell you.",
            "Depende de lo que necesites. Después de la auditoría gratis recibes un plan por escrito con un precio fijo, antes de empezar. Si no tiene sentido para tu negocio, te lo decimos.",
          ),
        },
        {
          q: s("How long before I see a difference?", "¿En cuánto tiempo voy a ver una diferencia?"),
          a: s(
            "Some things change the same week: calls answered, reminders sent. Being found on Google takes longer and builds month by month. We will be honest about what to expect before you commit.",
            "Algunas cosas cambian la misma semana: llamadas contestadas, recordatorios enviados. Aparecer en Google toma más tiempo y se construye mes a mes. Te diremos con honestidad qué esperar antes de que decidas.",
          ),
        },
        {
          q: s(
            "Will customers know they are not talking to a person?",
            "¿Los clientes van a saber que no hablan con una persona?",
          ),
          a: s(
            "The conversation sounds like your business, and it says so when it should. If someone asks for a person, they get one. You approve every message first.",
            "La conversación suena como tu negocio y lo dice cuando corresponde. Si alguien pide hablar con una persona, la consigue. Tú apruebas cada mensaje primero.",
          ),
        },
        {
          q: s("Do you work in Spanish?", "¿Trabajan en español?"),
          a: s(
            "Sí. Every service we offer works in English and Spanish — the website, the messages, the search pages. It is not a translation bolted on at the end; it is how we build.",
            "Sí. Todo lo que hacemos funciona en inglés y en español: el sitio, los mensajes, las páginas de búsqueda. No es una traducción pegada al final; es parte de cómo construimos.",
          ),
        },
        {
          q: s(
            "What happens after I request the free audit?",
            "¿Qué pasa después de pedir la auditoría gratis?",
          ),
          a: s(
            "We reply to schedule a 30-minute conversation. You tell us how customers reach you today; we ask questions and take notes. Then you receive a short written plan with what we would fix first and what it would cost.",
            "Te respondemos para agendar una conversación de 30 minutos. Nos cuentas cómo te contactan hoy tus clientes; hacemos preguntas y tomamos notas. Después recibes un plan breve por escrito con lo que arreglaríamos primero y cuánto costaría.",
          ),
        },
        {
          q: s(
            "Do you only work with businesses in Orlando?",
            "¿Solo trabajan con negocios en Orlando?",
          ),
          a: s(
            "We are based in Orlando and work across Central Florida: Kissimmee, Groveland, Clermont, Winter Garden, St. Cloud, Davenport, Leesburg and nearby.",
            "Tenemos base en Orlando y trabajamos en toda Florida Central: Kissimmee, Groveland, Clermont, Winter Garden, St. Cloud, Davenport, Leesburg y alrededores.",
          ),
        },
      ],
    },

    cta: {
      eyebrow: s("Free audit", "Auditoría gratis"),
      title: s("Let's find out what is slipping through.", "Vamos a ver qué se te está escapando."),
      body: s(
        "Book a free 30-minute audit. We will look at how customers reach you today and tell you — honestly — what we would fix first.",
        "Agenda una auditoría gratis de 30 minutos. Revisamos cómo te contactan hoy tus clientes y te decimos —con honestidad— qué arreglaríamos primero.",
      ),
      micro: s(
        "Free · No obligation · A written plan you can keep",
        "Gratis · Sin compromiso · Un plan por escrito que puedes conservar",
      ),
    },
  },

  services: {
    hub: {
      eyebrow: s("Services", "Servicios"),
      title: s("Every call answered. Every customer kept.", "Cada llamada contestada. Cada cliente conservado."),
      lead: s(
        "Most owners come to us with a feeling: the phone is quieter than it should be, the schedule has gaps, the admin never ends. We start there — and build the smallest thing that helps.",
        "La mayoría de los dueños llega con una sensación: el teléfono suena menos de lo que debería, la agenda tiene huecos, el papeleo no termina nunca. Empezamos por ahí — y construimos lo más pequeño que ayude.",
      ),
      cardsTitle: s("What we can take off your plate", "Lo que podemos quitarte de encima"),
      principlesTitle: s("How we choose what to build first", "Cómo elegimos qué construir primero"),
      principles: [
        {
          title: s("The smallest fix that works", "La solución más pequeña que funciona"),
          body: s(
            "We would rather solve the real problem with one change than sell you a platform.",
            "Preferimos resolver el problema real con un solo cambio antes que venderte una plataforma.",
          ),
        },
        {
          title: s("Your tools, not ours", "Tus herramientas, no las nuestras"),
          body: s(
            "We work with what you already use whenever we can. Less to learn, less to maintain.",
            "Trabajamos con lo que ya usas siempre que se puede. Menos que aprender, menos que mantener.",
          ),
        },
        {
          title: s("Measured in customers, not features", "Medido en clientes, no en funciones"),
          body: s(
            "If it does not help someone answer, book or come back, it is not worth building.",
            "Si no ayuda a contestar, reservar o volver, no vale la pena construirlo.",
          ),
        },
      ],
      helpTitle: s("Not sure where to start?", "¿No sabes por dónde empezar?"),
      helpBody: s(
        "That is what the free audit is for. Thirty minutes, a few honest questions, and a written plan with what we would fix first.",
        "Para eso está la auditoría gratis. Treinta minutos, unas cuantas preguntas honestas y un plan por escrito con lo que arreglaríamos primero.",
      ),
    },

    agents: {
      number: "01",
      navLabel: s("Answer every customer", "Contesta a cada cliente"),
      hero: {
        eyebrow: s("Answer every customer", "Contesta a cada cliente"),
        title: s(
          "Your busiest hour should not be the one that costs you a customer.",
          "Tu hora más ocupada no debería ser la que te cueste un cliente.",
        ),
        lead: s(
          "We set up a bilingual assistant that answers calls and messages, books appointments and handles the questions your team answers fifty times a day — at 2 p.m. and at 2 a.m.",
          "Configuramos un asistente bilingüe que contesta llamadas y mensajes, agenda citas y resuelve las preguntas que tu equipo responde cincuenta veces al día — a las 2 p.m. y a las 2 a.m.",
        ),
      },
      forWhoTitle: s("This is for you if…", "Esto es para ti si…"),
      forWho: [
        s(
          "Your phone rings while you are with a patient, a client or a full dining room.",
          "El teléfono suena mientras atiendes a un paciente, a un cliente o tienes el salón lleno.",
        ),
        s(
          "Messages wait hours because everyone is already doing two jobs.",
          "Los mensajes esperan horas porque todos ya están haciendo dos trabajos.",
        ),
        s(
          "You serve customers in English and Spanish and cannot staff both all day.",
          "Atiendes a clientes en inglés y en español y no puedes tener personal en ambos idiomas todo el día.",
        ),
      ],
      whatTitle: s("What we set up", "Qué configuramos"),
      what: [
        {
          title: s("Calls and messages answered", "Llamadas y mensajes contestados"),
          body: s(
            "Your business answers day and night, in both languages, with your greeting and your rules.",
            "Tu negocio contesta de día y de noche, en los dos idiomas, con tu saludo y tus reglas.",
          ),
        },
        {
          title: s("Appointments booked", "Citas agendadas"),
          body: s(
            "Customers pick a time that actually exists in your calendar, with a confirmation they can keep.",
            "El cliente elige un horario que de verdad está libre en tu agenda, con una confirmación que puede guardar.",
          ),
        },
        {
          title: s("Questions handled", "Preguntas resueltas"),
          body: s(
            "Hours, prices, insurance, parking, directions — answered the way you would answer them.",
            "Horarios, precios, seguros, estacionamiento, direcciones — contestados como tú los contestarías.",
          ),
        },
        {
          title: s("A clean handoff", "Un traspaso limpio"),
          body: s(
            "When a person is needed, the conversation reaches your team with the full context.",
            "Cuando hace falta una persona, la conversación llega a tu equipo con todo el contexto.",
          ),
        },
      ],
      howTitle: s("How it works", "Cómo funciona"),
      how: [
        {
          title: s("We listen to how you talk to customers.", "Escuchamos cómo hablas con tus clientes."),
          body: s(
            "Your greeting, your tone, the questions you get every day, and the ones only you should answer.",
            "Tu saludo, tu tono, las preguntas que recibes cada día y las que solo tú deberías contestar.",
          ),
        },
        {
          title: s("We build it and test it with you.", "Lo construimos y lo probamos contigo."),
          body: s(
            "You approve the wording in English and Spanish before a single customer sees it.",
            "Tú apruebas los textos en inglés y en español antes de que los vea un solo cliente.",
          ),
        },
        {
          title: s("We watch and adjust.", "Observamos y ajustamos."),
          body: s(
            "We review real conversations, fix what sounds off, and keep it current as your business changes.",
            "Revisamos conversaciones reales, corregimos lo que suena raro y lo mantenemos al día cuando tu negocio cambia.",
          ),
        },
      ],
      priceTitle: s("What it costs", "Cuánto cuesta"),
      price: s(
        "Most businesses start with a setup fee and a flat monthly price, agreed in writing before we begin. No per-minute surprises.",
        "La mayoría de los negocios empieza con una cuota de configuración y un precio mensual fijo, acordado por escrito antes de empezar. Sin sorpresas por minuto.",
      ),
      faqTitle: s("Questions about answering every customer", "Preguntas sobre contestar a cada cliente"),
      faq: [
        {
          q: s("Will it sound like a robot?", "¿Va a sonar como un robot?"),
          a: s(
            "It sounds like your business: your greeting, your tone, your rules. You approve every message before it goes live, and we adjust anything that sounds off.",
            "Suena como tu negocio: tu saludo, tu tono, tus reglas. Tú apruebas cada mensaje antes de que salga y ajustamos cualquier cosa que suene rara.",
          ),
        },
        {
          q: s(
            "What if a customer asks something it cannot answer?",
            "¿Y si un cliente pregunta algo que no puede responder?",
          ),
          a: s(
            "It hands the conversation to your team with the full context, and tells the customer when to expect a reply.",
            "Pasa la conversación a tu equipo con todo el contexto y le dice al cliente cuándo puede esperar una respuesta.",
          ),
        },
        {
          q: s("Do I have to change my phone number?", "¿Tengo que cambiar mi número de teléfono?"),
          a: s(
            "No. We work with the number you already have and the tools you already use.",
            "No. Trabajamos con el número que ya tienes y con las herramientas que ya usas.",
          ),
        },
        {
          q: s("Does it really work in Spanish?", "¿De verdad funciona en español?"),
          a: s(
            "Yes. Not a translated script: the same care in both languages, including the way people actually speak here.",
            "Sí. No es un guion traducido: el mismo cuidado en los dos idiomas, incluida la forma en que la gente habla aquí.",
          ),
        },
      ],
      ctaTitle: s("Find out how many calls you are missing.", "Descubre cuántas llamadas estás perdiendo."),
      ctaBody: s(
        "A free audit starts with your phone. We will look at when customers call, what happens after hours, and what it would take to answer every one.",
        "Una auditoría gratis empieza por tu teléfono. Revisamos cuándo llaman tus clientes, qué pasa fuera de horario y qué haría falta para contestar todas.",
      ),
    },

    followup: {
      number: "02",
      navLabel: s("Follow up automatically", "Seguimiento automático"),
      hero: {
        eyebrow: s("Follow up automatically", "Seguimiento automático"),
        title: s(
          "The follow-up you never have time for — done for you.",
          "El seguimiento para el que nunca tienes tiempo — nosotros lo hacemos por ti.",
        ),
        lead: s(
          "Reminders before appointments. A review request after a good visit. A check-in when a customer goes quiet. Sent automatically, written in your voice.",
          "Recordatorios antes de las citas. Una solicitud de reseña después de una buena visita. Un mensaje cuando un cliente se queda callado. Enviados automáticamente, escritos con tu voz.",
        ),
      },
      forWhoTitle: s("This is for you if…", "Esto es para ti si…"),
      forWho: [
        s("Your calendar has gaps you cannot explain.", "Tu agenda tiene huecos que no puedes explicar."),
        s(
          "You mean to send reminders and review requests, but the day gets away.",
          "Tienes la intención de enviar recordatorios y pedir reseñas, pero el día se te va.",
        ),
        s(
          "You pay for software nobody on the team uses.",
          "Pagas por un software que nadie en el equipo usa.",
        ),
      ],
      whatTitle: s("What we set up", "Qué configuramos"),
      what: [
        {
          title: s("Appointment reminders", "Recordatorios de citas"),
          body: s(
            "A friendly message before the visit, with the details they need to show up.",
            "Un mensaje amable antes de la visita, con los datos que necesita para llegar.",
          ),
        },
        {
          title: s("Review requests", "Solicitudes de reseña"),
          body: s(
            "Asked at the right moment, in the right words, with a link that takes ten seconds.",
            "Pedidas en el momento justo, con las palabras correctas y un enlace que toma diez segundos.",
          ),
        },
        {
          title: s("Win-back messages", "Mensajes para recuperar clientes"),
          body: s(
            "A note to customers who have not been back in a while, without sounding desperate.",
            "Una nota para clientes que no han vuelto en un tiempo, sin sonar desesperados.",
          ),
        },
        {
          title: s("One place to see it", "Un solo lugar para verlo"),
          body: s(
            "A simple view of what went out, what came back, and what needs a person.",
            "Una vista simple de lo que salió, lo que volvió y lo que necesita a una persona.",
          ),
        },
      ],
      howTitle: s("How it works", "Cómo funciona"),
      how: [
        {
          title: s("We map your customer journey.", "Trazamos el recorrido de tu cliente."),
          body: s(
            "From first inquiry to repeat visit: where a message helps and where it would annoy.",
            "Desde la primera consulta hasta la visita repetida: dónde ayuda un mensaje y dónde molesta.",
          ),
        },
        {
          title: s("We write the messages in both languages.", "Escribimos los mensajes en los dos idiomas."),
          body: s(
            "Short, human, on-brand. You approve every one.",
            "Breves, humanos, con tu estilo. Tú apruebas cada uno.",
          ),
        },
        {
          title: s("We turn it on and refine it.", "Lo activamos y lo refinamos."),
          body: s(
            "We watch what gets replies, cut what does not, and adjust the timing month by month.",
            "Vemos qué recibe respuestas, quitamos lo que no funciona y ajustamos los tiempos mes a mes.",
          ),
        },
      ],
      priceTitle: s("What it costs", "Cuánto cuesta"),
      price: s(
        "A setup fee plus a flat monthly price, agreed before we start. If a tool you already pay for can do the job, we will tell you instead of selling you another one.",
        "Una cuota de configuración y un precio mensual fijo, acordados antes de empezar. Si una herramienta que ya pagas puede hacer el trabajo, te lo decimos en lugar de venderte otra.",
      ),
      faqTitle: s("Questions about follow-up", "Preguntas sobre el seguimiento"),
      faq: [
        {
          q: s("Will customers feel spammed?", "¿Los clientes se van a sentir acosados?"),
          a: s(
            "No. Fewer, better-timed messages beat a flood. We set limits, respect opt-outs, and review the results with you.",
            "No. Menos mensajes, mejor enviados, funcionan más que una avalancha. Ponemos límites, respetamos las bajas y revisamos los resultados contigo.",
          ),
        },
        {
          q: s("Can I change the wording?", "¿Puedo cambiar los textos?"),
          a: s(
            "Any time. The messages are yours; we keep them in one place you can edit with us.",
            "Cuando quieras. Los mensajes son tuyos; los mantenemos en un solo lugar que puedes editar con nosotros.",
          ),
        },
        {
          q: s("Does this replace my booking system?", "¿Esto reemplaza mi sistema de reservas?"),
          a: s(
            "No. It works with what you already use. If your system cannot send reminders, we connect to it rather than replace it.",
            "No. Funciona con lo que ya usas. Si tu sistema no puede enviar recordatorios, nos conectamos a él en lugar de reemplazarlo.",
          ),
        },
      ],
      ctaTitle: s("See how many appointments you could rescue.", "Mira cuántas citas podrías rescatar."),
      ctaBody: s(
        "The free audit includes a look at your no-shows, your reviews and the customers who never came back.",
        "La auditoría gratis incluye una revisión de tus ausencias, tus reseñas y los clientes que nunca volvieron.",
      ),
    },

    found: {
      number: "03",
      navLabel: s("Be found first", "Que te encuentren primero"),
      hero: {
        eyebrow: s("Be found first", "Que te encuentren primero"),
        title: s(
          "When someone searches, they should find you — not the place down the road.",
          "Cuando alguien busca, debería encontrarte a ti — no al negocio de la esquina.",
        ),
        lead: s(
          "We clean up your Google profile, earn reviews the right way, and write pages that show up in English and Spanish across Central Florida.",
          "Ordenamos tu perfil de Google, conseguimos reseñas de la forma correcta y escribimos páginas que aparecen en inglés y en español en toda Florida Central.",
        ),
      },
      forWhoTitle: s("This is for you if…", "Esto es para ti si…"),
      forWho: [
        s(
          "You are invisible on Google Maps, even though your customers are nearby.",
          "Eres invisible en Google Maps, aunque tus clientes estén cerca.",
        ),
        s(
          "You serve Spanish-speaking customers, but your website only speaks English.",
          "Atiendes a clientes que hablan español, pero tu sitio web solo habla inglés.",
        ),
        s(
          "Your reviews are old — or there are only four of them.",
          "Tus reseñas son viejas — o solo tienes cuatro.",
        ),
      ],
      whatTitle: s("What we set up", "Qué configuramos"),
      what: [
        {
          title: s("Your Google profile", "Tu perfil de Google"),
          body: s(
            "Hours, services, photos and answers, kept accurate so people trust what they see.",
            "Horarios, servicios, fotos y respuestas, mantenidos al día para que la gente confíe en lo que ve.",
          ),
        },
        {
          title: s("Reviews", "Reseñas"),
          body: s(
            "A simple, respectful routine that brings in fresh reviews from happy customers.",
            "Una rutina simple y respetuosa que trae reseñas nuevas de clientes contentos.",
          ),
        },
        {
          title: s("Bilingual pages", "Páginas bilingües"),
          body: s(
            "Pages written for what people actually search, in both languages, not translated word for word.",
            "Páginas escritas para lo que la gente realmente busca, en los dos idiomas, sin traducir palabra por palabra.",
          ),
        },
        {
          title: s("Local answers", "Respuestas locales"),
          body: s(
            "The questions people ask before they choose: insurance, parking, prices, wait times.",
            "Las preguntas que la gente hace antes de elegir: seguros, estacionamiento, precios, tiempos de espera.",
          ),
        },
      ],
      howTitle: s("How it works", "Cómo funciona"),
      how: [
        {
          title: s("We look at what people actually search.", "Vemos qué busca la gente de verdad."),
          body: s(
            "The words your neighbors use, in English and Spanish, before they call.",
            "Las palabras que usan tus vecinos, en inglés y en español, antes de llamar.",
          ),
        },
        {
          title: s("We fix the basics first.", "Arreglamos lo básico primero."),
          body: s(
            "Profile, hours, categories, photos, reviews. The quick wins before the long game.",
            "Perfil, horarios, categorías, fotos, reseñas. Lo que da resultado rápido antes del trabajo de fondo.",
          ),
        },
        {
          title: s("We write and publish, month by month.", "Escribimos y publicamos, mes a mes."),
          body: s(
            "Useful pages that answer real questions, with progress you can see.",
            "Páginas útiles que responden preguntas reales, con un progreso que puedes ver.",
          ),
        },
      ],
      priceTitle: s("What it costs", "Cuánto cuesta"),
      price: s(
        "A flat monthly price, agreed before we start. Search work compounds, so we ask for enough time to make it count — and we tell you honestly how long that is.",
        "Un precio mensual fijo, acordado antes de empezar. El trabajo de búsqueda se acumula, así que pedimos el tiempo suficiente para que valga la pena — y te decimos con honestidad cuánto es.",
      ),
      faqTitle: s("Questions about being found", "Preguntas sobre aparecer en las búsquedas"),
      faq: [
        {
          q: s("How long does it take?", "¿Cuánto tiempo toma?"),
          a: s(
            "The profile fixes can help within weeks. Search results build over months, not days. We will tell you what is realistic for your market before you commit.",
            "Los arreglos del perfil pueden ayudar en semanas. Los resultados de búsqueda se construyen en meses, no en días. Te diremos qué es realista para tu mercado antes de que decidas.",
          ),
        },
        {
          q: s("Do I need a new website?", "¿Necesito un sitio web nuevo?"),
          a: s(
            "Not always. If your current site is solid, we improve the pages that matter. If it is holding you back, we will say so and show you why.",
            "No siempre. Si tu sitio actual es sólido, mejoramos las páginas que importan. Si te está frenando, te lo decimos y te mostramos por qué.",
          ),
        },
        {
          q: s(
            "Will this work for Spanish-speaking customers?",
            "¿Esto funciona para clientes que hablan español?",
          ),
          a: s(
            "Yes. We write for how people search here, including the mix of English and Spanish that happens in Central Florida.",
            "Sí. Escribimos para cómo busca la gente aquí, incluida la mezcla de inglés y español que se da en Florida Central.",
          ),
        },
      ],
      ctaTitle: s("Find out what people see when they search for you.", "Descubre qué ve la gente cuando te busca."),
      ctaBody: s(
        "The free audit includes a search from a customer's point of view, in both languages.",
        "La auditoría gratis incluye una búsqueda desde el punto de vista de un cliente, en los dos idiomas.",
      ),
    },

    tools: {
      number: "04",
      navLabel: s("Tools that fit", "Herramientas a tu medida"),
      hero: {
        eyebrow: s("Tools that fit", "Herramientas a tu medida"),
        title: s(
          "Less admin. More time with customers.",
          "Menos papeleo. Más tiempo con tus clientes.",
        ),
        lead: s(
          "When off-the-shelf tools do not fit, we build the small, focused tools that remove the spreadsheet, the paper form or the double entry.",
          "Cuando las herramientas genéricas no encajan, construimos las herramientas pequeñas y enfocadas que eliminan la hoja de cálculo, el formulario de papel o la doble captura.",
        ),
      },
      forWhoTitle: s("This is for you if…", "Esto es para ti si…"),
      forWho: [
        s(
          "You are running the business on spreadsheets and group texts.",
          "Llevas el negocio con hojas de cálculo y mensajes de grupo.",
        ),
        s(
          "You pay for software with forty features and use four.",
          "Pagas por un software con cuarenta funciones y usas cuatro.",
        ),
        s(
          "Your team re-types the same information into three places.",
          "Tu equipo vuelve a escribir la misma información en tres lugares.",
        ),
      ],
      whatTitle: s("What we set up", "Qué configuramos"),
      what: [
        {
          title: s("Quotes and estimates", "Cotizaciones y presupuestos"),
          body: s(
            "A simple form that produces a clean quote and keeps a record of what was sent.",
            "Un formulario simple que genera una cotización limpia y guarda un registro de lo enviado.",
          ),
        },
        {
          title: s("Intake and paperwork", "Registro y papeleo"),
          body: s(
            "Forms customers can complete before they arrive, stored where your team can find them.",
            "Formularios que el cliente completa antes de llegar, guardados donde tu equipo los encuentra.",
          ),
        },
        {
          title: s("Scheduling and reminders", "Agenda y recordatorios"),
          body: s(
            "The parts of your calendar that your current tools do not cover.",
            "Las partes de tu agenda que tus herramientas actuales no cubren.",
          ),
        },
        {
          title: s("Simple dashboards", "Paneles simples"),
          body: s(
            "The handful of numbers you actually check, in one place.",
            "Los pocos números que de verdad revisas, en un solo lugar.",
          ),
        },
      ],
      howTitle: s("How it works", "Cómo funciona"),
      how: [
        {
          title: s("We sit with the people doing the work.", "Nos sentamos con quienes hacen el trabajo."),
          body: s(
            "The front desk, the kitchen, the field. The tool has to fit the real day, not the org chart.",
            "La recepción, la cocina, la calle. La herramienta tiene que encajar en el día real, no en el organigrama.",
          ),
        },
        {
          title: s("We build the smallest version that helps.", "Construimos la versión más pequeña que ayuda."),
          body: s(
            "No six-month project. Something your team can use next week.",
            "Sin proyectos de seis meses. Algo que tu equipo pueda usar la próxima semana.",
          ),
        },
        {
          title: s("We train your team and stay close.", "Entrenamos a tu equipo y seguimos cerca."),
          body: s(
            "A short walkthrough, a written guide, and a person to call when something changes.",
            "Una explicación breve, una guía escrita y una persona a quien llamar cuando algo cambie.",
          ),
        },
      ],
      priceTitle: s("What it costs", "Cuánto cuesta"),
      price: s(
        "You pay for what we build, not for a license you will never use. Scope and price are agreed in writing before any work begins.",
        "Pagas por lo que construimos, no por una licencia que nunca vas a usar. El alcance y el precio se acuerdan por escrito antes de empezar.",
      ),
      faqTitle: s("Questions about custom tools", "Preguntas sobre herramientas a la medida"),
      faq: [
        {
          q: s("Do I need to replace my current system?", "¿Necesito reemplazar mi sistema actual?"),
          a: s(
            "Usually not. We build around what works and replace only the part that is costing you time.",
            "Normalmente no. Construimos alrededor de lo que funciona y reemplazamos solo la parte que te está costando tiempo.",
          ),
        },
        {
          q: s("Who owns what you build?", "¿De quién es lo que construyen?"),
          a: s(
            "You do. The accounts, the data and the tool are yours.",
            "Tuyo. Las cuentas, los datos y la herramienta son tuyos.",
          ),
        },
        {
          q: s("What if we need changes later?", "¿Y si necesitamos cambios después?"),
          a: s(
            "We plan for that. Small changes are part of the relationship; bigger ones get a clear quote.",
            "Lo tenemos previsto. Los cambios pequeños son parte de la relación; los grandes reciben una cotización clara.",
          ),
        },
      ],
      ctaTitle: s("Tell us where the spreadsheet breaks.", "Cuéntanos dónde se rompe la hoja de cálculo."),
      ctaBody: s(
        "The free audit includes a look at the tools your team uses today — and the ones they have quietly stopped using.",
        "La auditoría gratis incluye una revisión de las herramientas que tu equipo usa hoy — y de las que dejó de usar en silencio.",
      ),
    },
  },

  about: {
    hero: {
      eyebrow: s("About FM Digital AI", "Sobre FM Digital AI"),
      title: s(
        "A small studio with a long memory for local businesses.",
        "Un estudio pequeño con buena memoria para los negocios locales.",
      ),
      lead: s(
        "We are based in Orlando and work with owners across Central Florida. We speak English and Spanish. And we would rather explain something twice than hide behind a word you would never use.",
        "Tenemos base en Orlando y trabajamos con dueños de toda Florida Central. Hablamos inglés y español. Y preferimos explicar algo dos veces antes que escondernos detrás de una palabra que nunca usarías.",
      ),
      imageAlt: s(
        "A local business owner smiling in her shop",
        "Una dueña de negocio sonriendo en su local",
      ),
    },
    story: {
      title: s("Why we exist", "Por qué existimos"),
      paragraphs: [
        s(
          "FM Digital AI started with a simple observation: the businesses that make a city feel like a city — the dentist who remembers your kids, the restaurant that knows your order, the barber who stays open late — were being out-marketed by companies with bigger budgets and colder service.",
          "FM Digital AI nació de una observación simple: los negocios que hacen que una ciudad se sienta como una ciudad — el dentista que recuerda a tus hijos, el restaurante que sabe tu pedido, el barbero que cierra tarde — estaban perdiendo frente a empresas con más presupuesto y menos calidez.",
        ),
        s(
          "Our team has spent years in advertising and marketing, much of it for hospitality brands in Central Florida. We kept meeting owners who had been sold complicated tools they did not need, or who had no idea what was happening on their own website. We started this studio to do the opposite: small, clear improvements, explained in plain language, built around the way the business already works.",
          "Nuestro equipo ha pasado años en publicidad y marketing, buena parte en marcas de hospitalidad de Florida Central. Nos encontrábamos una y otra vez con dueños a quienes les habían vendido herramientas complicadas que no necesitaban, o que no tenían idea de lo que pasaba en su propio sitio web. Empezamos este estudio para hacer lo contrario: mejoras pequeñas y claras, explicadas en palabras simples, construidas alrededor de cómo funciona el negocio.",
        ),
        s(
          "Today we work with clinics, restaurants, realtors, accountants and local service businesses. Some need to answer the phone. Some need to be found. Most need both — and someone who will pick up when they call.",
          "Hoy trabajamos con clínicas, restaurantes, agentes de bienes raíces, contadores y negocios de servicios locales. Algunos necesitan contestar el teléfono. Otros necesitan que los encuentren. La mayoría necesita las dos cosas — y alguien que conteste cuando llaman.",
        ),
      ],
    },
    values: {
      title: s("What we believe", "Lo que creemos"),
      items: [
        {
          title: s("Plain language first", "Primero, palabras simples"),
          body: s(
            "If it cannot be explained to a busy owner in one sentence, it is not ready.",
            "Si no se puede explicar a un dueño ocupado en una sola frase, no está listo.",
          ),
        },
        {
          title: s("Small fixes before big projects", "Arreglos pequeños antes que grandes proyectos"),
          body: s(
            "The best first step is usually the cheapest one. We start there.",
            "El mejor primer paso suele ser el más económico. Empezamos por ahí.",
          ),
        },
        {
          title: s("Your business stays yours", "Tu negocio sigue siendo tuyo"),
          body: s(
            "Your accounts, your data, your customer relationships. We do not hold them hostage.",
            "Tus cuentas, tus datos, tu relación con los clientes. No los retenemos como rehenes.",
          ),
        },
        {
          title: s("Local, not distant", "Locales, no distantes"),
          body: s(
            "We live here. We see the same streets, the same seasons, the same customers.",
            "Vivimos aquí. Vemos las mismas calles, las mismas temporadas, los mismos clientes.",
          ),
        },
      ],
    },
    studio: {
      eyebrow: s("The studio", "El estudio"),
      title: s("A local studio built around one idea: answer people.", "Un estudio local con una idea central: contestar a la gente."),
      body: s(
        "FM Digital AI is a small team in Orlando. We work directly with the businesses we serve — no layers, no call centers, no hand-offs. You get one point of contact, plain language in English or Spanish, and a written plan before anything starts.",
        "FM Digital AI es un equipo pequeño en Orlando. Trabajamos directamente con los negocios a los que servimos: sin capas, sin call centers y sin traspasos. Tienes un solo punto de contacto, palabras simples en inglés o en español y un plan por escrito antes de empezar.",
      ),
      points: [
        s(
          "One point of contact from the first call to the last adjustment.",
          "Un solo punto de contacto desde la primera llamada hasta el último ajuste.",
        ),
        s("Plain language, in English or Spanish.", "Palabras simples, en inglés o en español."),
        s("A written plan before anything starts.", "Un plan por escrito antes de empezar."),
      ],
      noteTitle: s("How we work", "Cómo trabajamos"),
      note: s(
        "We would rather explain something twice than hide behind a word you would never use. We keep the work small, the promises real and the plan in writing.",
        "Preferimos explicar algo dos veces antes que escondernos detrás de una palabra que nunca usarías. Mantenemos el trabajo pequeño, las promesas reales y el plan por escrito.",
      ),
      signature: s("FM Digital AI", "FM Digital AI"),
      image: "studio-team",
      photoAlt: s("Two members of the FM Digital AI team working together", "Dos miembros del equipo de FM Digital AI trabajando juntos"),
    },
    area: {
      title: s("Where we work", "Dónde trabajamos"),
      body: s(
        "We are based in Orlando and work with businesses across Central Florida. If you are nearby, we can meet in person — coffee is on us.",
        "Tenemos base en Orlando y trabajamos con negocios de toda Florida Central. Si estás cerca, podemos vernos en persona — el café lo ponemos nosotros.",
      ),
    },
  },

  process: {
    hero: {
      eyebrow: s("Our process", "Nuestro proceso"),
      title: s(
        "What it is actually like to work with us.",
        "Cómo es realmente trabajar con nosotros.",
      ),
      lead: s(
        "No discovery marathons. No forty-page decks. Four steps, plainly explained.",
        "Sin maratones de descubrimiento. Sin presentaciones de cuarenta páginas. Cuatro pasos, explicados con claridad.",
      ),
    },
    steps: [
      {
        number: "01",
        title: s("A conversation, not a pitch.", "Una conversación, no una venta."),
        body: s(
          "We ask about your week: where customers come from, what happens after hours, what your team still does by hand.",
          "Preguntamos por tu semana: de dónde llegan los clientes, qué pasa fuera de horario, qué sigue haciendo tu equipo a mano.",
        ),
        detail: s(
          "You get an honest read on where you are losing people.",
          "Recibes una lectura honesta de dónde estás perdiendo clientes.",
        ),
      },
      {
        number: "02",
        title: s("A plan you can hold.", "Un plan que puedes tener en la mano."),
        body: s(
          "A short document with what we would fix first, what it costs and what we expect it to change.",
          "Un documento breve con lo que arreglaríamos primero, cuánto cuesta y qué esperamos que cambie.",
        ),
        detail: s(
          "You get a written plan, yours to keep.",
          "Recibes un plan por escrito, tuyo para siempre.",
        ),
      },
      {
        number: "03",
        title: s("The build, without the drama.", "La construcción, sin drama."),
        body: s(
          "We set up the calls, the messages, the pages or the tool. You approve the wording in both languages.",
          "Configuramos las llamadas, los mensajes, las páginas o la herramienta. Tú apruebas los textos en los dos idiomas.",
        ),
        detail: s(
          "You get something that works before we call it done.",
          "Recibes algo que funciona antes de que lo demos por terminado.",
        ),
      },
      {
        number: "04",
        title: s("The part most agencies skip.", "La parte que la mayoría de las agencias se salta."),
        body: s(
          "Every month we review what is working, fix what is not, and send you a two-minute update.",
          "Cada mes revisamos lo que funciona, arreglamos lo que no y te enviamos una actualización de dos minutos.",
        ),
        detail: s(
          "You get a partner who is still there in month six.",
          "Recibes un socio que sigue ahí en el sexto mes.",
        ),
      },
    ],
    needTitle: s("What we need from you", "Qué necesitamos de ti"),
    needs: [
      s("Thirty minutes, once.", "Treinta minutos, una sola vez."),
      s("Access to your Google profile and your phone.", "Acceso a tu perfil de Google y a tu teléfono."),
      s("A look at how your team works today.", "Una mirada a cómo trabaja hoy tu equipo."),
      s("Honesty about the budget.", "Honestidad sobre el presupuesto."),
    ],
    wontTitle: s("What we will not do", "Lo que no haremos"),
    wonts: [
      s("Sell you tools you do not need.", "Venderte herramientas que no necesitas."),
      s("Hide behind jargon.", "Escondernos detrás de tecnicismos."),
      s("Promise numbers we cannot prove.", "Prometer cifras que no podemos demostrar."),
      s("Disappear after launch.", "Desaparecer después del lanzamiento."),
    ],
    faqTitle: s("Questions about the process", "Preguntas sobre el proceso"),
    faq: [
      {
        q: s("How long does a project take?", "¿Cuánto dura un proyecto?"),
        a: s(
          "A small setup can be live in days. A new website takes weeks. Search work is measured in months. You get dates in writing before we start, and we tell you when something changes.",
          "Una configuración pequeña puede estar lista en días. Un sitio web nuevo toma semanas. El trabajo de búsqueda se mide en meses. Recibes fechas por escrito antes de empezar y te avisamos cuando algo cambia.",
        ),
      },
      {
        q: s("Do I have to sign a long contract?", "¿Tengo que firmar un contrato largo?"),
        a: s(
          "We agree on the scope and the review point before we start. You will always know what you are committing to and what happens next.",
          "Acordamos el alcance y el punto de revisión antes de empezar. Siempre sabrás a qué te comprometes y qué pasa después.",
        ),
      },
      {
        q: s("What if I want to stop?", "¿Y si quiero parar?"),
        a: s(
          "We plan the work in stages so you can decide at each stage whether to continue. Your accounts, your data and your customer relationships stay yours.",
          "Planeamos el trabajo por etapas para que decidas en cada una si seguir. Tus cuentas, tus datos y tu relación con los clientes siguen siendo tuyos.",
        ),
      },
    ],
  },

  work: {
    hero: {
      eyebrow: s("Our work", "Nuestro trabajo"),
      title: s("Projects we are glad to put our name on.", "Proyectos que firmamos con orgullo."),
      lead: s(
        "We do not publish numbers we cannot prove. What we can show you is the thinking, the work, and the reason behind each decision.",
        "No publicamos cifras que no podemos demostrar. Lo que sí podemos mostrarte es el razonamiento, el trabajo y la razón detrás de cada decisión.",
      ),
    },
    projects: [
      {
        project: s("Aula Pro", "Aula Pro"),
        kind: s("Online education · Spanish & English", "Educación en línea · Español e inglés"),
        title: s(
          "One course platform that speaks both languages.",
          "Una plataforma de cursos que habla dos idiomas.",
        ),
        context: s(
          "Aula Pro teaches practical courses to students across Latin America and the United States. The business was growing in two languages, but the website treated Spanish as an afterthought.",
          "Aula Pro enseña cursos prácticos a estudiantes de América Latina y Estados Unidos. El negocio crecía en dos idiomas, pero el sitio web trataba el español como algo secundario.",
        ),
        didTitle: s("What we did", "Qué hicimos"),
        did: [
          s(
            "Rebuilt the course catalog so every course exists once, in both languages.",
            "Reconstruimos el catálogo de cursos para que cada curso exista una sola vez, en los dos idiomas.",
          ),
          s(
            "Simplified enrollment to a single flow with clear next steps.",
            "Simplificamos la inscripción a un solo proceso con pasos claros.",
          ),
          s(
            "Wrote the pages around what students actually ask before they buy.",
            "Escribimos las páginas alrededor de lo que los estudiantes realmente preguntan antes de comprar.",
          ),
        ],
        changedTitle: s("What changed", "Qué cambió"),
        changed: [
          s("One site to maintain instead of two.", "Un solo sitio que mantener en lugar de dos."),
          s("Fewer emails asking how to enroll.", "Menos correos preguntando cómo inscribirse."),
          s("A catalog that reads naturally in both languages.", "Un catálogo que se lee natural en los dos idiomas."),
        ],
        image: "office-professional",
        alt: s("A professional working at her desk", "Una profesional trabajando en su escritorio"),
      },
      {
        project: s("Expert Path", "Expert Path"),
        kind: s("Professional training", "Formación profesional"),
        title: s(
          "A clearer path from visitor to student.",
          "Un camino más claro del visitante al estudiante.",
        ),
        context: s(
          "Expert Path sells professional training to people changing careers. The courses were strong; the website made them hard to compare.",
          "Expert Path vende formación profesional a personas que cambian de carrera. Los cursos eran sólidos; el sitio web los hacía difíciles de comparar.",
        ),
        didTitle: s("What we did", "Qué hicimos"),
        did: [
          s(
            "Reorganized programs around the questions students search for.",
            "Reorganizamos los programas según las preguntas que buscan los estudiantes.",
          ),
          s(
            "Rebuilt program pages with outcomes, format and time commitment up front.",
            "Reconstruimos las páginas de programas con resultados, formato y tiempo de dedicación desde el inicio.",
          ),
          s(
            "Made the path from interest to enrollment obvious on every page.",
            "Hicimos evidente el camino del interés a la inscripción en cada página.",
          ),
        ],
        changedTitle: s("What changed", "Qué cambió"),
        changed: [
          s("Programs that are easier to compare.", "Programas más fáciles de comparar."),
          s("An enrollment path with fewer dead ends.", "Un proceso de inscripción con menos callejones sin salida."),
          s("A site the team can update without help.", "Un sitio que el equipo puede actualizar sin ayuda."),
        ],
        image: "team-notes",
        alt: s("Colleagues reviewing notes together at a table", "Colegas revisando notas juntos en una mesa"),
      },
    ],
    noteTitle: s("A note on proof", "Una nota sobre las pruebas"),
    note: s(
      "Some client work is private. If you want to talk to a reference, ask — when the client agrees, we will connect you.",
      "Parte del trabajo con clientes es privado. Si quieres hablar con una referencia, pídela — cuando el cliente acepta, te conectamos.",
    ),
    ctaTitle: s("Your project could be next.", "Tu proyecto puede ser el siguiente."),
    ctaBody: s(
      "Tell us what you are trying to fix. The free audit is a good place to start, even if you are not sure you need us.",
      "Cuéntanos qué quieres arreglar. La auditoría gratis es un buen punto de partida, aunque no estés seguro de necesitarnos.",
    ),
  },

  contact: {
    hero: {
      eyebrow: s("Free audit", "Auditoría gratis"),
      title: s(
        "Thirty minutes. A plain-English plan. No obligation.",
        "Treinta minutos. Un plan en palabras simples. Sin compromiso.",
      ),
      lead: s(
        "Tell us a little about your business. We will reply to schedule your audit — and come prepared with questions, not a sales pitch.",
        "Cuéntanos un poco sobre tu negocio. Te responderemos para agendar tu auditoría — y llegaremos con preguntas, no con un discurso de ventas.",
      ),
    },
    nextTitle: s("What happens next", "Qué pasa después"),
    next: [
      {
        title: s("We reply.", "Respondemos."),
        body: s(
          "A short message to find a time that works. No sequence of automated emails.",
          "Un mensaje breve para encontrar un horario que te sirva. Sin cadenas de correos automáticos.",
        ),
      },
      {
        title: s("We talk for 30 minutes.", "Conversamos 30 minutos."),
        body: s(
          "You describe your week; we ask about the moments where customers slip away.",
          "Tú describes tu semana; nosotros preguntamos por los momentos en que se pierden los clientes.",
        ),
      },
      {
        title: s("You get a written plan.", "Recibes un plan por escrito."),
        body: s(
          "What we would fix first, what it costs and what to expect. Keep it either way.",
          "Qué arreglaríamos primero, cuánto cuesta y qué puedes esperar. Consérvalo de todos modos.",
        ),
      },
    ],
    asideTitle: s("What to expect", "Qué esperar"),
    aside: [
      s("No pressure to buy anything.", "Sin presión para comprar nada."),
      s("No jargon, in either language.", "Sin tecnicismos, en ningún idioma."),
      s("A real person from our studio.", "Una persona real de nuestro estudio."),
    ],
    note: s(
      "Prefer to write first? Use the form and tell us the best time to call.",
      "¿Prefieres escribir primero? Usa el formulario y dinos cuál es el mejor momento para llamarte.",
    ),
    areaTitle: s("We work across Central Florida", "Trabajamos en toda Florida Central"),
    areaBody: s(
      "Based in Orlando, working with businesses in Kissimmee, Groveland, Clermont, Winter Garden, St. Cloud, Davenport, Leesburg and nearby.",
      "Con base en Orlando, trabajamos con negocios en Kissimmee, Groveland, Clermont, Winter Garden, St. Cloud, Davenport, Leesburg y alrededores.",
    ),
    faqTitle: s("Before you send", "Antes de enviar"),
    faq: [
      {
        q: s("Is the audit really free?", "¿La auditoría es realmente gratis?"),
        a: s(
          "Yes. Thirty minutes and a written plan, with no obligation to hire us.",
          "Sí. Treinta minutos y un plan por escrito, sin obligación de contratarnos.",
        ),
      },
      {
        q: s("What should I prepare?", "¿Qué debo preparar?"),
        a: s(
          "Nothing formal. If you can, have a rough idea of how many calls or messages you get in a week — and where you think customers are slipping away.",
          "Nada formal. Si puedes, ten una idea aproximada de cuántas llamadas o mensajes recibes en una semana — y dónde crees que se están perdiendo clientes.",
        ),
      },
      {
        q: s("Can we do it in Spanish?", "¿Podemos hacerlo en español?"),
        a: s(
          "Of course. The audit, the plan and the follow-up can all be in Spanish.",
          "Claro. La auditoría, el plan y el seguimiento pueden ser en español.",
        ),
      },
    ],
  },

  legal: {
    updated: s("Last updated: November 2026", "Última actualización: noviembre de 2026"),
    privacy: {
      title: s("Privacy policy", "Política de privacidad"),
      intro: s(
        "This policy explains what we collect when you use this site, why we collect it, and what you can ask us to do with it.",
        "Esta política explica qué recopilamos cuando usas este sitio, por qué lo hacemos y qué puedes pedirnos que hagamos con esa información.",
      ),
      sections: [
        {
          heading: s("What we collect", "Qué recopilamos"),
          body: [
            s(
              "When you submit the free audit form, we collect your name, email, phone number, website and message. Only your name and email are required.",
              "Cuando envías el formulario de auditoría gratis, recopilamos tu nombre, correo, teléfono, sitio web y mensaje. Solo el nombre y el correo son obligatorios.",
            ),
          ],
        },
        {
          heading: s("Why we collect it", "Por qué lo recopilamos"),
          body: [
            s(
              "Only to reply to your request and prepare your audit. We do not sell your information or add you to a mailing list.",
              "Solo para responder a tu solicitud y preparar tu auditoría. No vendemos tu información ni te agregamos a listas de correo.",
            ),
          ],
        },
        {
          heading: s("Where it goes", "Dónde va"),
          body: [
            s(
              "Your submission is stored in a private database used by FM Digital AI. We do not share it with advertisers.",
              "Tu envío se guarda en una base de datos privada que usa FM Digital AI. No la compartimos con anunciantes.",
            ),
          ],
        },
        {
          heading: s("Cookies", "Cookies"),
          body: [
            s(
              "This site does not use advertising or analytics cookies. Your language choice lives in the address of the page, not in a tracking cookie.",
              "Este sitio no usa cookies de publicidad ni de analítica. Tu elección de idioma vive en la dirección de la página, no en una cookie de seguimiento.",
            ),
          ],
        },
        {
          heading: s("Your choices", "Tus opciones"),
          body: [
            s(
              "You can ask us to delete your information at any time by contacting us through the free audit form.",
              "Puedes pedirnos que eliminemos tu información en cualquier momento contactándonos a través del formulario de auditoría gratis.",
            ),
          ],
        },
        {
          heading: s("Questions", "Preguntas"),
          body: [
            s(
              "Questions about this policy? Reach us through the free audit form and say it is about privacy.",
              "¿Preguntas sobre esta política? Escríbenos por el formulario de auditoría gratis e indica que es sobre privacidad.",
            ),
          ],
        },
      ],
    },
    terms: {
      title: s("Terms of service", "Términos del servicio"),
      intro: s(
        "These terms cover your use of this website. Services we provide are governed by a separate written agreement.",
        "Estos términos cubren tu uso de este sitio web. Los servicios que prestamos se rigen por un acuerdo escrito aparte.",
      ),
      sections: [
        {
          heading: s("Using this site", "Uso de este sitio"),
          body: [
            s(
              "The content on this site is for information only. It is not a guarantee of results for your business.",
              "El contenido de este sitio es solo informativo. No es una garantía de resultados para tu negocio.",
            ),
          ],
        },
        {
          heading: s("Our work", "Nuestro trabajo"),
          body: [
            s(
              "Any service we provide is governed by a written agreement that describes the scope, the price and the responsibilities of both sides.",
              "Cualquier servicio que prestemos se rige por un acuerdo escrito que describe el alcance, el precio y las responsabilidades de ambas partes.",
            ),
          ],
        },
        {
          heading: s("Intellectual property", "Propiedad intelectual"),
          body: [
            s(
              "The text, images and design of this site belong to FM Digital AI unless noted otherwise. Please do not copy them without permission.",
              "Los textos, imágenes y el diseño de este sitio pertenecen a FM Digital AI salvo que se indique lo contrario. No los copies sin permiso.",
            ),
          ],
        },
        {
          heading: s("Third-party links", "Enlaces a terceros"),
          body: [
            s(
              "We may link to other websites. We are not responsible for their content or their privacy practices.",
              "Podemos enlazar a otros sitios web. No somos responsables de su contenido ni de sus prácticas de privacidad.",
            ),
          ],
        },
        {
          heading: s("Changes", "Cambios"),
          body: [
            s(
              "We may update these terms as the site changes. The date at the top tells you when they last changed.",
              "Podemos actualizar estos términos a medida que cambia el sitio. La fecha en la parte superior indica cuándo cambiaron por última vez.",
            ),
          ],
        },
        {
          heading: s("Questions", "Preguntas"),
          body: [
            s(
              "Questions about these terms? Use the free audit form.",
              "¿Preguntas sobre estos términos? Usa el formulario de auditoría gratis.",
            ),
          ],
        },
      ],
    },
  },

  sitemap: {
    eyebrow: s("Sitemap", "Mapa del sitio"),
    title: s("Every page, in both languages.", "Todas las páginas, en los dos idiomas."),
    intro: s(
      "Use this page to find anything on the site. Each page is available in English and Spanish.",
      "Usa esta página para encontrar cualquier cosa en el sitio. Cada página está disponible en inglés y en español.",
    ),
    sectionsTitle: s("Pages", "Páginas"),
    englishLabel: s("English", "English"),
    spanishLabel: s("Español", "Español"),
    legalTitle: s("Legal", "Legal"),
  },

  notFound: {
    eyebrow: s("404", "404"),
    title: s("This page took a wrong turn.", "Esta página tomó un desvío."),
    body: s(
      "The page you were looking for does not exist, or it moved. Let us get you back to something useful.",
      "La página que buscabas no existe o se movió. Volvamos a algo útil.",
    ),
  },

  meta: {
    home: {
      title: s(
        "FM Digital AI | Answer every customer, in English and Spanish",
        "FM Digital AI | Atiende a cada cliente, en inglés y en español",
      ),
      description: s(
        "A Central Florida studio helping clinics, restaurants and local businesses answer every call and message, fill their calendars and get found first — in English and Spanish.",
        "Un estudio de Florida Central que ayuda a clínicas, restaurantes y negocios locales a contestar cada llamada y mensaje, llenar su agenda y aparecer primero — en inglés y en español.",
      ),
    },
    services: {
      title: s("Services | FM Digital AI", "Servicios | FM Digital AI"),
      description: s(
        "Calls answered, follow-ups sent, customers found and tools that fit. Four ways FM Digital AI helps Central Florida businesses keep the customers they earn.",
        "Llamadas contestadas, seguimientos enviados, clientes encontrados y herramientas a la medida. Cuatro formas en que FM Digital AI ayuda a los negocios de Florida Central.",
      ),
    },
    agents: {
      title: s("Answer every customer | FM Digital AI", "Contesta a cada cliente | FM Digital AI"),
      description: s(
        "Calls and messages answered day and night, in English and Spanish, with appointments booked and questions handled.",
        "Llamadas y mensajes contestados de día y de noche, en inglés y en español, con citas agendadas y preguntas resueltas.",
      ),
    },
    followup: {
      title: s("Follow up automatically | FM Digital AI", "Seguimiento automático | FM Digital AI"),
      description: s(
        "Reminders, review requests and check-ins that keep your calendar full and your no-shows down — written in your voice.",
        "Recordatorios, solicitudes de reseña y mensajes que mantienen tu agenda llena y reducen las ausencias — escritos con tu voz.",
      ),
    },
    found: {
      title: s("Be found first | FM Digital AI", "Que te encuentren primero | FM Digital AI"),
      description: s(
        "A clean Google profile, fresh reviews and pages in English and Spanish, so Central Florida customers find you first.",
        "Un perfil de Google ordenado, reseñas frescas y páginas en inglés y español para que los clientes de Florida Central te encuentren primero.",
      ),
    },
    tools: {
      title: s("Tools that fit | FM Digital AI", "Herramientas a tu medida | FM Digital AI"),
      description: s(
        "Small, focused tools that remove the spreadsheet, the paper form and the double entry — built around how your business actually works.",
        "Herramientas pequeñas y enfocadas que eliminan la hoja de cálculo, el formulario de papel y la doble captura — hechas para cómo funciona tu negocio.",
      ),
    },
    about: {
      title: s("About | FM Digital AI", "Nosotros | FM Digital AI"),
      description: s(
        "A small Orlando studio with a long memory for local businesses. Bilingual, local, and built to answer.",
        "Un estudio pequeño en Orlando con buena memoria para los negocios locales. Bilingüe, local y hecho para contestar.",
      ),
    },
    process: {
      title: s("Our process | FM Digital AI", "Nuestro proceso | FM Digital AI"),
      description: s(
        "Four steps, plainly explained: a conversation, a written plan, a build without drama, and a partner who is still there in month six.",
        "Cuatro pasos explicados con claridad: una conversación, un plan por escrito, una construcción sin drama y un socio que sigue ahí en el sexto mes.",
      ),
    },
    work: {
      title: s("Our work | FM Digital AI", "Nuestro trabajo | FM Digital AI"),
      description: s(
        "Projects we are glad to put our name on — and the thinking behind each decision. No numbers we cannot prove.",
        "Proyectos que firmamos con orgullo — y el razonamiento detrás de cada decisión. Sin cifras que no podamos demostrar.",
      ),
    },
    contact: {
      title: s("Free audit | FM Digital AI", "Auditoría gratis | FM Digital AI"),
      description: s(
        "Request a free 30-minute audit. A plain-English plan with what to fix first, what it costs and what to expect. No obligation.",
        "Solicita una auditoría gratis de 30 minutos. Un plan en palabras simples con lo que arreglar primero, cuánto cuesta y qué esperar. Sin compromiso.",
      ),
    },
    privacy: {
      title: s("Privacy policy | FM Digital AI", "Política de privacidad | FM Digital AI"),
      description: s(
        "What FM Digital AI collects through this site, why, and what you can ask us to do with it.",
        "Qué recopila FM Digital AI a través de este sitio, por qué y qué puedes pedirnos que hagamos con esa información.",
      ),
    },
    terms: {
      title: s("Terms of service | FM Digital AI", "Términos del servicio | FM Digital AI"),
      description: s(
        "The terms that cover your use of the FM Digital AI website.",
        "Los términos que cubren tu uso del sitio web de FM Digital AI.",
      ),
    },
    sitemap: {
      title: s("Sitemap | FM Digital AI", "Mapa del sitio | FM Digital AI"),
      description: s(
        "Every page on the FM Digital AI site, in English and Spanish.",
        "Todas las páginas del sitio de FM Digital AI, en inglés y en español.",
      ),
    },
    notFound: {
      title: s("Page not found | FM Digital AI", "Página no encontrada | FM Digital AI"),
      description: s(
        "This page does not exist or it moved. Head back to the home page.",
        "Esta página no existe o se movió. Vuelve a la página de inicio.",
      ),
    },
  },
};
