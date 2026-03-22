/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Smartphone, 
  TrendingUp, 
  Code2, 
  Mail, 
  Github, 
  Linkedin, 
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Languages,
  MessageCircle,
  ArrowLeft,
  Sun,
  Moon,
  Megaphone,
  Brain,
  Zap,
  Database
} from 'lucide-react';

type Language = 'en' | 'he' | 'ru' | 'uk' | 'ja' | 'zh' | 'ar' | 'hi' | 'fr' | 'de';
type View = 'home' | 'privacy' | 'terms';

const languages: { code: Language; name: string; flag: string; rtl?: boolean }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'he', name: 'עברית', flag: '🇮🇱', rtl: true },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

interface Content {
  nav: {
    services: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: {
    title: string;
    items: {
      title: string;
      description: string;
      icon: any;
    }[];
  };
  about: {
    title: string;
    text: string;
  };
  contact: {
    title: string;
    email: string;
    github: string;
    linkedin: string;
    whatsapp: string;
  };
  privacy: {
    title: string;
    content: string;
  };
  terms: {
    title: string;
    content: string;
  };
  footer: string;
  back: string;
}

const content: Record<Language, Content> = {
  en: {
    nav: {
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    hero: {
      title: 'Crafting Digital Excellence',
      subtitle: 'Bespoke websites, mobile applications, trading bots, and custom algorithms tailored for your business needs.',
      cta: 'Get in touch',
    },
    services: {
      title: 'Expertise',
      items: [
        {
          title: 'Web Development',
          description: 'High-performance, responsive websites built with modern technologies.',
          icon: Globe,
        },
        {
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile solutions for iOS and Android.',
          icon: Smartphone,
        },
        {
          title: 'Trading Bots',
          description: 'Automated trading strategies and bots for various financial markets.',
          icon: TrendingUp,
        },
        {
          title: 'Custom Software',
          description: 'Tailor-made algorithms and software solutions for complex problems.',
          icon: Code2,
        },
        {
          title: 'Digital Promotion',
          description: 'Strategic digital marketing and online presence optimization.',
          icon: Megaphone,
        },
        {
          title: 'AI & Machine Learning',
          description: 'Advanced AI solutions and machine learning models for business intelligence.',
          icon: Brain,
        },
        {
          title: 'Automation Solutions',
          description: 'Streamlining workflows and processes with custom automation tools.',
          icon: Zap,
        },
        {
          title: 'Data & Forecasting',
          description: 'Advanced data gathering and predictive analytics for informed decision making.',
          icon: Database,
        },
      ],
    },
    about: {
      title: 'About Me',
      text: 'I am a dedicated software developer focused on delivering high-quality, scalable, and efficient solutions. I am also the founder of the Yehoshama Foundation, where we leverage technology for social impact.',
    },
    contact: {
      title: 'Let\'s Connect',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      whatsapp: 'WhatsApp',
    },
    privacy: {
      title: 'Privacy Policy',
      content: `
        ### Data Collection
        We collect minimal data necessary to provide our services. This may include your contact information when you reach out to us.
        
        ### Data Disclosure
        We value your privacy above all. We will NOT disclose, share, or sell your personal data to any third party, government agency, or individual unless explicitly required by a valid legal warrant issued by a competent court of law.
        
        ### Security
        We implement industry-standard security measures to protect your data from unauthorized access or disclosure.
        
        ### Your Rights
        You have the right to request access to, correction of, or deletion of your personal data at any time.
      `,
    },
    terms: {
      title: 'Terms of Service',
      content: `
        ### 1. Services
        Yehoshama Software Solutions provides custom software development, mobile applications, and trading bots. Each project is governed by a specific agreement outlining scope and deliverables.
        
        ### 2. Intellectual Property
        All code, designs, and algorithms remain the property of Yehoshama Software Solutions until full payment for the project has been received. Upon full payment, ownership is transferred to the client as per the project agreement.
        
        ### 3. Liability
        Our liability is strictly limited to the total amount paid by the client for the specific project or service in question. We are not liable for any indirect, incidental, or consequential damages.
        
        ### 4. Trading Bots Disclaimer
        Trading bots are tools for automation. We do not guarantee financial gains. Users assume all risks associated with financial markets and trading.
        
        ### 5. Jurisdiction
        These terms are governed by the laws of the State of Israel. Any disputes shall be resolved in the competent courts of Tel Aviv.
      `,
    },
    footer: '© 2024 Yehoshama. All rights reserved.',
    back: 'Back to Home',
  },
  ru: {
    nav: { services: 'Услуги', about: 'О нас', contact: 'Контакты', privacy: 'Конфиденциальность', terms: 'Условия' },
    hero: { title: 'Создание цифрового совершенства', subtitle: 'Индивидуальные веб-сайты, мобильные приложения, торговые боты и алгоритмы под ваши нужды.', cta: 'Связаться' },
    services: { title: 'Экспертиза', items: [
      { title: 'Веб-разработка', description: 'Высокопроизводительные сайты на современных технологиях.', icon: Globe },
      { title: 'Мобильные приложения', description: 'Нативные и кроссплатформенные решения для iOS и Android.', icon: Smartphone },
      { title: 'Торговые боты', description: 'Автоматизированные стратегии и боты для финансовых рынков.', icon: TrendingUp },
      { title: 'ПО на заказ', description: 'Индивидуальные алгоритмы и решения для сложных задач.', icon: Code2 },
      { title: 'Цифровое продвижение', description: 'Стратегический цифровой маркетинг и оптимизация онлайн-присутствия.', icon: Megaphone },
      { title: 'ИИ и машинное обучение', description: 'Передовые решения в области ИИ и модели машинного обучения.', icon: Brain },
      { title: 'Решения для автоматизации', description: 'Оптимизация рабочих процессов с помощью инструментов автоматизации.', icon: Zap },
      { title: 'Сбор данных и прогнозирование', description: 'Инструменты сбора данных и предиктивная аналитика для бизнеса.', icon: Database }
    ]},
    about: { title: 'Обо мне', text: 'Я преданный разработчик, создающий качественные и эффективные решения. Основатель фонда Yehoshama Foundation.' },
    contact: { title: 'Свяжитесь со мной', email: 'Email', github: 'GitHub', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' },
    privacy: {
      title: 'Политика конфиденциальности',
      content: `
        ### Сбор данных
        Мы собираем минимальный объем данных, необходимый для предоставления наших услуг. Это может включать вашу контактную информацию, когда вы обращаетесь к нам.
        
        ### Раскрытие данных
        Мы ценим вашу конфиденциальность превыше всего. Мы НЕ будем раскрывать, передавать или продавать ваши личные данные любой третьей стороне, государственному органу или частному лицу, за исключением случаев, когда это прямо требуется на основании действующего судебного ордера, выданного компетентным судом.
        
        ### Безопасность
        Мы применяем стандартные отраслевые меры безопасности для защиты ваших данных от несанкционированного доступа или раскрытия.
        
        ### Ваши права
        Вы имеете право запросить доступ к своим личным данным, их исправление или удаление в любое время.
      `,
    },
    terms: {
      title: 'Условия использования',
      content: `
        ### 1. Услуги
        Yehoshama Software Solutions предоставляет услуги по разработке программного обеспечения на заказ, мобильных приложений и торговых ботов. Каждый проект регулируется отдельным соглашением, определяющим объем работ и результаты.
        
        ### 2. Интеллектуальная собственность
        Весь код, дизайн и алгоритмы остаются собственностью Yehoshama Software Solutions до получения полной оплаты за проект. После полной оплаты право собственности переходит к клиенту в соответствии с соглашением о проекте.
        
        ### 3. Ответственность
        Наша ответственность строго ограничена общей суммой, уплаченной клиентом за конкретный проект или услугу. Мы не несем ответственности за любые косвенные, случайные или последующие убытки.
        
        ### 4. Отказ от ответственности за торговых ботов
        Торговые боты являются инструментами автоматизации. Мы не гарантируем финансовую прибыль. Пользователи принимают на себя все риски, связанные с финансовыми рынками и торговлей.
        
        ### 5. Юрисдикция
        Настоящие условия регулируются законодательством Государства Израиль. Любые споры подлежат разрешению в компетентных судах Тель-Авива.
      `,
    },
    footer: '© 2024 Yehoshama. Все права защищены.',
    back: 'На главную',
  },
  uk: {
    nav: { services: 'Послуги', about: 'Про нас', contact: 'Контакти', privacy: 'Конфіденційність', terms: 'Умови' },
    hero: { title: 'Створення цифрової досконалості', subtitle: 'Індивідуальні веб-сайти, мобільні додатки, торгові боти та алгоритми.', cta: 'Зв’язатися' },
    services: { title: 'Експертиза', items: [
      { title: 'Веб-розробка', description: 'Високопродуктивні сайти на сучасних технологіях.', icon: Globe },
      { title: 'Мобільні додатки', description: 'Нативні та кросплатформенні рішення для iOS та Android.', icon: Smartphone },
      { title: 'Торгові боти', description: 'Автоматизовані стратегії та боти для фінансових ринків.', icon: TrendingUp },
      { title: 'ПЗ на замовлення', description: 'Індивідуальні алгоритми та рішення для складних завдань.', icon: Code2 },
      { title: 'Цифрове просування', description: 'Стратегічний цифровий маркетинг та оптимізація онлайн-присутності.', icon: Megaphone },
      { title: 'ШІ та машинне навчання', description: 'Передові рішення в галузі ШІ та моделі машинного навчання.', icon: Brain },
      { title: 'Рішення для автоматизації', description: 'Оптимізація робочих процесів за допомогою інструментів автоматизації.', icon: Zap },
      { title: 'Збір даних та прогнозування', description: 'Інструменти збору даних та предиктивна аналітика для бізнесу.', icon: Database }
    ]},
    about: { title: 'Про мене', text: 'Я відданий розробник, що створює якісні та ефективні рішення. Засновник фонду Yehoshama Foundation.' },
    contact: { title: 'Зв’яжіться зі мною', email: 'Email', github: 'GitHub', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' },
    privacy: {
      title: 'Політика конфіденційності',
      content: `
        ### Збір даних
        Ми збираємо мінімальний обсяг даних, необхідний для надання наших послуг. Це може включати вашу контактну інформацію, коли ви звертаєтеся до нас.
        
        ### Розкриття даних
        Ми цінуємо вашу конфіденційність понад усе. Ми НЕ будемо розкривати, передавати або продавати ваші особисті дані будь-якій третій стороні, державній установі або приватній особі, за винятком випадків, коли це прямо вимагається на підставі чинного судового ордера, виданого компетентним судом.
        
        ### Безпека
        Ми впроваджуємо стандартні галузеві заходи безпеки для захисту ваших даних від несанкціонованого доступу або розкриття.
        
        ### Ваші права
        Ви маєте право в будь-який час запросити доступ до своїх особистих даних, їх виправлення або видалення.
      `,
    },
    terms: {
      title: 'Умови використання',
      content: `
        ### 1. Послуги
        Yehoshama Software Solutions надає послуги з розробки програмного забезпечення на замовлення, мобільних додатків та торгових ботів. Кожен проект регулюється окремою угодою, що визначає обсяг робіт та результати.
        
        ### 2. Інтелектуальна власність
        Весь код, дизайн та алгоритми залишаються власністю Yehoshama Software Solutions до отримання повної оплати за проект. Після повної оплати право власності переходить до клієнта відповідно до угоди про проект.
        
        ### 3. Відповідальність
        Наша відповідальність суворо обмежена загальною сумою, сплаченою клієнтом за конкретний проект або послугу. Ми не несемо відповідальності за будь-які непрямі, випадкові або послідовні збитки.
        
        ### 4. Відмова від відповідальності за торгових ботів
        Торгові боти є інструментами автоматизації. Ми не гарантуємо фінансовий прибуток. Користувачі беруть на себе всі ризики, пов'язані з фінансовими ринками та торгівлею.
        
        ### 5. Юрисдикція
        Ці умови регулюються законодавством Держави Ізраїль. Будь-які суперечки підлягають вирішенню в компетентних судах Тель-Авіва.
      `,
    },
    footer: '© 2024 Yehoshama. Всі права захищені.',
    back: 'На головну',
  },
  ja: {
    nav: { services: 'サービス', about: '私について', contact: 'お問い合わせ', privacy: 'プライバシー', terms: '規約' },
    hero: { title: 'デジタルの卓越性を創造する', subtitle: 'オーダーメイドのウェブサイト、モバイルアプリ、トレーディングボット、カスタムアルゴリズム。', cta: 'お問い合わせ' },
    services: { title: '専門知識', items: [
      { title: 'ウェブ開発', description: '最新技術を駆使した高性能でレスポンシブなサイト。', icon: Globe },
      { title: 'モバイルアプリ', description: 'iOSとAndroid向けのネイティブおよびクロスプラットフォーム。', icon: Smartphone },
      { title: 'トレードボット', description: '金融市場向けの自動取引戦略とボット。', icon: TrendingUp },
      { title: 'カスタムソフト', description: '複雑な問題に対するオーダーメイドのアルゴリズム。', icon: Code2 },
      { title: 'デジタルプロモーション', description: '戦略的なデジタルマーケティングとオンラインプレゼンスの最適化。', icon: Megaphone },
      { title: 'AIと機械学習', description: 'ビジネスインテリジェンスのための高度なAIソリューション।', icon: Brain },
      { title: '自動化ソリューション', description: 'カスタム自動化ツールによるワークフローの合理化।', icon: Zap },
      { title: 'データ収集と予測', description: '意思決定のための高度なデータ収集と予測分析।', icon: Database }
    ]},
    about: { title: '自己紹介', text: '高品質で効率的なソリューションを提供する開発者です。Yehoshama Foundationの創設者でもあります。' },
    contact: { title: 'つながりましょう', email: 'メール', github: 'GitHub', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' },
    privacy: {
      title: 'プライバシーポリシー',
      content: `
        ### データの収集
        サービスの提供に必要な最小限のデータのみを収集します。これには、お問い合わせ時にお客様が提供された連絡先情報が含まれる場合があります。
        
        ### データの開示
        私たちは何よりもお客様のプライバシーを尊重します。管轄裁判所が発行した有効な法的令状によって明示的に要求されない限り、お客様の個人データを第三者、政府機関、または個人に開示、共有、または販売することはありません。
        
        ### セキュリティ
        不正アクセスや開示からお客様のデータを保護するために、業界標準のセキュリティ対策を講じています。
        
        ### お客様の権利
        お客様は、いつでもご自身の個人データへのアクセス、訂正、または削除を要求する権利を有します。
      `,
    },
    terms: {
      title: '利用規約',
      content: `
        ### 1. サービス
        Yehoshama Software Solutionsは、カスタムソフトウェア開発、モバイルアプリケーション、およびトレーディングボットを提供します。各プロジェクトは、範囲と成果物を概説する特定の合意によって管理されます。
        
        ### 2. 知的財産
        すべてのコード、デザイン、およびアルゴリズムは、プロジェクトの全額支払いが完了するまで、Yehoshama Software Solutionsの財産であり続けます。全額支払い後、プロジェクト合意に従って所有権がクライアントに移転します。
        
        ### 3. 責任
        当社の責任は、当該の特定のプロジェクトまたはサービスに対してクライアントが支払った総額に厳格に限定されます。当社は、間接的、偶発的、または派生的な損害について一切の責任を負いません。
        
        ### 4. トレーディングボットに関する免責事項
        トレーディングボットは自動化のためのツールです。当社は金銭的な利益を保証しません。ユーザーは、金融市場および取引に関連するすべてのリスクを負うものとします。
        
        ### 5. 管轄裁判所
        本規約はイスラエル国の法律に準拠します。紛争が生じた場合は、テルアビブの管轄裁判所において解決されるものとします。
      `,
    },
    footer: '© 2024 Yehoshama. All rights reserved.',
    back: 'ホームに戻る',
  },
  zh: {
    nav: { services: '服务', about: '关于', contact: '联系', privacy: '隐私', terms: '条款' },
    hero: { title: '打造卓越数字化体验', subtitle: '量身定制的网站、移动应用、交易机器人和自定义算法。', cta: '联系我们' },
    services: { title: '专业领域', items: [
      { title: '网页开发', description: '使用现代技术构建的高性能响应式网站。', icon: Globe },
      { title: '移动应用', description: '适用于 iOS 和 Android 的原生和跨平台解决方案。', icon: Smartphone },
      { title: '交易机器人', description: '针对各种金融市场的自动化交易策略。', icon: TrendingUp },
      { title: '定制软件', description: '针对复杂问题的量身定制算法。', icon: Code2 },
      { title: '数字推广', description: '战略性数字营销和在线形象优化。', icon: Megaphone },
      { title: '人工智能与机器学习', description: '用于商业智能的高级人工智能解决方案。', icon: Brain },
      { title: '自动化解决方案', description: '通过自定义自动化工具简化工作流程。', icon: Zap },
      { title: '数据采集与预测', description: '用于明智决策的高级数据采集和预测分析。', icon: Database }
    ]},
    about: { title: '关于我', text: '致力于提供高质量、可扩展的解决方案。Yehoshama Foundation 创始人。' },
    contact: { title: '保持联系', email: '邮箱', github: 'GitHub', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' },
    privacy: {
      title: '隐私政策',
      content: `
        ### 数据收集
        我们仅收集提供服务所必需的最少数据。这可能包括您联系我们时提供的联系信息。
        
        ### 数据披露
        我们视您的隐私为重中之重。除非主管法院签发的有效法律搜查令明确要求，否则我们绝不会向任何第三方、政府机构或个人披露、共享或出售您的个人数据。
        
        ### 安全
        我们实施行业标准的安全措施，以保护您的数据免受未经授权的访问或披露。
        
        ### 您的权利
        您有权随时要求访问、更正或删除您的个人数据。
      `,
    },
    terms: {
      title: '服务条款',
      content: `
        ### 1. 服务
        Yehoshama Software Solutions 提供定制软件开发、移动应用程序和交易机器人。每个项目均受概述范围和交付成果的特定协议约束。
        
        ### 2. 知识产权
        在收到项目的全额付款之前，所有代码、设计和算法均属于 Yehoshama Software Solutions 的财产。全额付款后，所有权将根据项目协议转移给客户。
        
        ### 3. 责任
        我们的责任严格限于客户为特定项目或服务支付的总金额。我们不对任何间接、附带或后果性损害负责。
        
        ### 4. 交易机器人免责声明
        交易机器人是自动化工具。我们不保证财务收益。用户承担与金融市场和交易相关的所有风险。
        
        ### 5. 管辖权
        这些条款受以色列国法律管辖。任何争议应在特拉维夫的主管法院解决。
      `,
    },
    footer: '© 2024 Yehoshama. 版权所有。',
    back: '返回首页',
  },
  ar: {
    nav: { services: 'الخدمات', about: 'حول', contact: 'اتصل', privacy: 'الخصوصية', terms: 'الشروط' },
    hero: { title: 'صياغة التميز الرقمي', subtitle: 'مواقع ويب، تطبيقات جوال، بوتات تداول، وخوارزميات مخصصة.', cta: 'اتصل بنا' },
    services: { title: 'خبرتنا', items: [
      { title: 'تطوير الويب', description: 'مواقع عالية الأداء مبنية بأحدث التقنيات.', icon: Globe },
      { title: 'تطبيقات الجوال', description: 'حلول أصلية وعبر المنصات لنظامي iOS وأندروאיד.', icon: Smartphone },
      { title: 'بوتات التداول', description: 'استراتيجيات تداول آلية لمختلف الأسواق المالية.', icon: TrendingUp },
      { title: 'برمجيات مخصصة', description: 'خوارزميات وحلول برمجية للمشكلات المعقدة.', icon: Code2 },
      { title: 'الترويج الرقمي', description: 'التسويق الرقمي الاستراتيجي وتحسين التواجد عبر الإنترنت.', icon: Megaphone },
      { title: 'الذكاء الاصطناعي وتعلم الآلة', description: 'حلول ذكاء اصطناعي متقدمة ونماذج تعلم الآلة لذكاء الأعمال.', icon: Brain },
      { title: 'حلول الأتمتة', description: 'تبسيط سير العمل والعمليات باستخدام أدوات أتمتة مخصصة.', icon: Zap },
      { title: 'جمع البيانات والتنبؤ', description: 'جمع البيانات المتقدمة والتحليلات التنبؤية لاتخاذ قرارات مدروسة.', icon: Database }
    ]},
    about: { title: 'عني', text: 'مطور برمجيات متخصص في تقديم حلول عالية الجودة. مؤسس مؤسسة יהושמע (Yehoshama Foundation).' },
    contact: { title: 'لنكن على اتصال', email: 'بريد', github: 'GitHub', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' },
    privacy: {
      title: 'سياسة الخصوصية',
      content: `
        ### جمع البيانات
        نحن نجمع الحد الأدنى من البيانات اللازمة لتقديم خدماتنا. قد يشمل ذلك معلومات الاتصال الخاصة بك عندما تتواصل معنا.
        
        ### الكشف عن البيانات
        نحن نقدر خصوصيتك فوق كل شيء. لن نقوم بالكشف عن بياناتك الشخصية أو مشاركتها أو بيعها لأي طرف ثالث أو وكالة حكومية أو فرد ما لم يطلب ذلك صراحةً بموجب أمر قضائي ساري المفعول صادر عن محكمة مختصة.
        
        ### الأمان
        نحن نطبق تدابير أمنية قياسية في الصناعة لحماية بياناتك من الوصول غير المصرح به أو الكشف عنها.
        
        ### حقوقك
        لديك الحق في طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت.
      `,
    },
    terms: {
      title: 'شروط الخدمة',
      content: `
        ### 1. الخدمات
        تقدم Yehoshama Software Solutions تطوير البرمجيات المخصصة وتطبيقات الجوال وبوتات التداول. يخضع كل مشروع لاتفاقية محددة تحدد النطاق والتسليمات.
        
        ### 2. الملكية الفكرية
        تظل جميع الأكواد والتصاميم والخوارزميات ملكاً لشركة Yehoshama Software Solutions حتى يتم استلام كامل المبلغ المدفوع للمشروع. عند السداد الكامل، تنتقل الملكية إلى العميل وفقاً لاتفاقية المشروع.
        
        ### 3. المسؤولية
        تقتصر مسؤوليتنا بشكل صارم على المبلغ الإجمالي الذي دفعه العميل مقابل المشروع أو الخدمة المحددة المعنية. نحن لسنا مسؤولين عن أي أضرار غير مباشرة أو عرضية أو تبعية.
        
        ### 4. إخلاء مسؤولية بوتات التداول
        بوتات التداول هي أدوات للأتمتة. نحن لا نضمن تحقيق مكاسب مالية. يتحمل المستخدمون جميع المخاطر المرتبطة بالأسواق المالية والتداول.
        
        ### 5. الاختصاص القضائي
        تخضع هذه الشروط لقوانين دولة إسرائيل. يتم حل أي نزاعات في المحاكم المختصة في تل أبيب.
      `,
    },
    footer: '© 2024 Yehoshama. جميع الحقوق محفوظة.',
    back: 'العودة للرئيسية',
  },
  hi: {
    nav: { services: 'सेवाएं', about: 'बारे में', contact: 'संपर्क', privacy: 'गोपनीयता', terms: 'शर्तें' },
    hero: { title: 'डिजिटल उत्कृष्टता का निर्माण', subtitle: 'कस्टम वेबसाइट, मोबाइल ऐप, ट्रेडिंग बॉट और एल्गोरिदम।', cta: 'संपर्क करें' },
    services: { title: 'विशेषज्ञता', items: [
      { title: 'वेब विकास', description: 'आधुनिक तकनीकों के साथ उच्च प्रदर्शन वाली वेबसाइटें।', icon: Globe },
      { title: 'मोबाइल ऐप', description: 'iOS और Android के लिए नेटिव और क्रॉस-प्लेटफॉर्म समाधान।', icon: Smartphone },
      { title: 'ट्रेडिंग बॉट', description: 'वित्तीय बाजारों के लिए स्वचालित ट्रेडिंग रणनीतियां।', icon: TrendingUp },
      { title: 'कस्टम सॉफ्टवेयर', description: 'जटिल समस्याओं के लिए विशेष एल्गोरिदम।', icon: Code2 },
      { title: 'डिजिटल प्रमोशन', description: 'रणनीतिक डिजिटल मार्केटिंग और ऑनलाइन उपस्थिति अनुकूलन।', icon: Megaphone },
      { title: 'एआई और मशीन लर्निंग', description: 'बिजनेस इंटेलिजेंस के लिए उन्नत एआई समाधान।', icon: Brain },
      { title: 'स्वचालन समाधान', description: 'कस्टम स्वचालन उपकरणों के साथ वर्कफ़्लो को सुव्यवस्थित करना।', icon: Zap },
      { title: 'डेटा एकत्रण और पूर्वानुमान', description: 'सूचित निर्णय लेने के लिए उन्नत डेटा एकत्रण और भविष्य कहने वाला विश्लेषण।', icon: Database }
    ]},
    about: { title: 'मेरे बारे में', text: 'मैं एक समर्पित सॉफ्टवेयर डेवलपर हूं। Yehoshama Foundation का संस्थापक।' },
    contact: { title: 'जुड़ें', email: 'ईमेल', github: 'GitHub', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' },
    privacy: {
      title: 'गोपनीयता नीति',
      content: `
        ### डेटा संग्रह
        हम अपनी सेवाएं प्रदान करने के लिए आवश्यक न्यूनतम डेटा एकत्र करते हैं। इसमें आपके द्वारा हमसे संपर्क करने पर दी गई संपर्क जानकारी शामिल हो सकती है।
        
        ### डेटा प्रकटीकरण
        हम आपकी गोपनीयता को सर्वोपरि मानते हैं। हम आपके व्यक्तिगत डेटा को किसी भी तीसरे पक्ष, सरकारी एजेंसी या व्यक्ति के साथ तब तक साझा, प्रकट या बेचेंगे नहीं, जब तक कि सक्षम न्यायालय द्वारा जारी वैध कानूनी वारंट द्वारा स्पष्ट रूप से आवश्यक न हो।
        
        ### सुरक्षा
        हम आपके डेटा को अनधिकृत पहुंच या प्रकटीकरण से बचाने के लिए उद्योग-मानक सुरक्षा उपाय लागू करते हैं।
        
        ### आपके अधिकार
        आपको किसी भी समय अपने व्यक्तिगत डेटा तक पहुंच, सुधार या हटाने का अनुरोध करने का अधिकार है।
      `,
    },
    terms: {
      title: 'सेवा की शर्तें',
      content: `
        ### 1. सेवाएं
        Yehoshama Software Solutions कस्टम सॉफ्टवेयर विकास, मोबाइल एप्लिकेशन और ट्रेडिंग बॉट प्रदान करता. प्रत्येक परियोजना एक विशिष्ट समझौते द्वारा शासित होती है जिसमें कार्यक्षेत्र और डिलिवरेबल्स का विवरण होता है।
        
        ### 2. बौद्धिक संपदा
        परियोजना के लिए पूर्ण भुगतान प्राप्त होने तक सभी कोड, डिज़ाइन और एल्गोरिदम Yehoshama Software Solutions की संपत्ति बने रहेंगे। पूर्ण भुगतान पर, परियोजना समझौते के अनुसार स्वामित्व क्लाइंट को हस्तांतरित कर दिया जाता है।
        
        ### 3. दायित्व
        हमारा दायित्व संबंधित विशिष्ट परियोजना या सेवा के लिए क्लाइंट द्वारा भुगतान की गई कुल राशि तक सख्ती से सीमित है। हम किसी भी अप्रत्यक्ष, आकस्मिक या परिणामी नुकसान के लिए उत्तरदायी नहीं हैं।
        
        ### 4. ट्रेडिंग बॉट अस्वीकरण
        ट्रेडिंग बॉट स्वचालन के लिए उपकरण हैं। हम वित्तीय लाभ की गारंटी नहीं देते हैं। उपयोगकर्ता वित्तीय बाजारों और व्यापार से जुड़े सभी जोखिमों को स्वीकार करते हैं।
        
        ### 5. अधिकार क्षेत्र
        ये शर्तें इज़राइल राज्य के कानूनों द्वारा शासित हैं। किसी भी विवाद का समाधान तेल अवीव के सक्षम न्यायालयों में किया जाएगा।
      `,
    },
    footer: '© 2024 Yehoshama. सर्वाधिकार सुरक्षित।',
    back: 'होम पर वापस जाएं',
  },
  fr: {
    nav: { services: 'Services', about: 'À propos', contact: 'Contact', privacy: 'Confidentialité', terms: 'Conditions' },
    hero: { title: 'L\'Excellence Digitale', subtitle: 'Sites web, applications mobiles, bots de trading et algorithmes sur mesure.', cta: 'Contactez-nous' },
    services: { title: 'Expertise', items: [
      { title: 'Développement Web', description: 'Sites performants et responsifs avec les technologies modernes.', icon: Globe },
      { title: 'Apps Mobiles', description: 'Solutions natives et cross-platform pour iOS et Android.', icon: Smartphone },
      { title: 'Bots de Trading', description: 'Stratégies automatisées pour les marchés financiers.', icon: TrendingUp },
      { title: 'Logiciels Sur Mesure', description: 'Algorithmes personnalisés pour problèmes complexes.', icon: Code2 },
      { title: 'Promotion Digitale', description: 'Marketing numérique stratégique et optimisation de la présence en ligne.', icon: Megaphone },
      { title: 'IA et Apprentissage Automatique', description: 'Solutions d\'IA avancées et modèles d\'apprentissage automatique.', icon: Brain },
      { title: 'Solutions d\'Automatisation', description: 'Optimisation des flux de travail avec des outils d\'automatisation.', icon: Zap },
      { title: 'Collecte de Données et Prévisions', description: 'Collecte de données avancée et analyses prédictives pour des décisions éclairées.', icon: Database }
    ]},
    about: { title: 'À propos', text: 'Développeur passionné par les solutions efficaces. Fondateur de la Yehoshama Foundation.' },
    contact: { title: 'Contactez-moi', email: 'Email', github: 'GitHub', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' },
    privacy: {
      title: 'Confidentialité',
      content: `
        ### Collecte de données
        Nous collectons le minimum de données nécessaires pour fournir nos services. Cela peut inclure vos coordonnées lorsque vous nous contactez.
        
        ### Divulgation des données
        Nous accordons une importance primordiale à votre vie privée. Nous ne divulguerons, ne partagerons ni ne vendrons vos données personnelles à aucun tiers, agence gouvernementale ou individu, à moins que cela ne soit explicitement requis par un mandat légal valide délivré par un tribunal compétent.
        
        ### Sécurité
        Nous mettons en œuvre des mesures de sécurité conformes aux normes de l'industrie pour protéger vos données contre tout accès ou divulgation non autorisé.
        
        ### Vos droits
        Vous avez le droit de demander l'accès à vos données personnelles, leur rectification ou leur suppression à tout moment.
      `,
    },
    terms: {
      title: 'Conditions',
      content: `
        ### 1. Services
        Yehoshama Software Solutions fournit des services de développement de logiciels personnalisés, d'applications mobiles et de bots de trading. Chaque projet est régi par un accord spécifique définissant la portée et les livrables.
        
        ### 2. Propriété intellectuelle
        Tous les codes, conceptions et algorithmes restent la propriété de Yehoshama Software Solutions jusqu'au paiement intégral du projet. Une fois le paiement intégral effectué, la propriété est transférée au client conformément à l'accord de projet.
        
        ### 3. Responsabilité
        Notre responsabilité est strictement limitée au montant total payé par le client pour le projet ou le service spécifique en question. Nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs.
        
        ### 4. Avis de non-responsabilité pour les bots de trading
        Les bots de trading sont des outils d'automatisation. Nous ne garantissons pas de gains financiers. Les utilisateurs assument tous les risques associés aux marchés financiers et au trading.
        
        ### 5. Juridiction
        Ces conditions sont régies par les lois de l'État d'Israël. Tout litige sera résolu devant les tribunaux compétents de Tel Aviv.
      `,
    },
    footer: '© 2024 Yehoshama. Tous droits réservés.',
    back: 'Retour à l\'accueil',
  },
  de: {
    nav: { services: 'Dienste', about: 'Über uns', contact: 'Kontakt', privacy: 'Datenschutz', terms: 'Bedingungen' },
    hero: { title: 'Digitale Exzellenz', subtitle: 'Websites, Apps, Trading-Bots und maßgeschneiderte Algorithmen.', cta: 'Kontaktieren' },
    services: { title: 'Expertise', items: [
      { title: 'Webentwicklung', description: 'Hochleistungs-Websites mit modernen Technologien.', icon: Globe },
      { title: 'Mobile Apps', description: 'Native und Cross-Platform-Lösungen für iOS und Android.', icon: Smartphone },
      { title: 'Trading-Bots', description: 'Automatisierte Strategien für Finanzmärkte.', icon: TrendingUp },
      { title: 'Individualsoftware', description: 'Maßgeschneiderte Algorithmen für komplexe Probleme.', icon: Code2 },
      { title: 'Digitale Promotion', description: 'Strategisches digitales Marketing und Optimierung der Online-Präsenz.', icon: Megaphone },
      { title: 'KI & Maschinelles Lernen', description: 'Fortschrittliche KI-Lösungen und Modelle für maschinelles Lernen.', icon: Brain },
      { title: 'Automatisierungslösungen', description: 'Optimierung von Arbeitsabläufen mit maßgeschneiderten Tools.', icon: Zap },
      { title: 'Datenerfassung & Prognose', description: 'Fortschrittliche Datenerfassung und prädiktive Analysen für fundierte Entscheidungen.', icon: Database }
    ]},
    about: { title: 'Über mich', text: 'Entwickler für hochwertige Lösungen. Gründer der Yehoshama Foundation.' },
    contact: { title: 'Kontaktieren', email: 'Email', github: 'GitHub', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' },
    privacy: {
      title: 'Datenschutz',
      content: `
        ### Datenerhebung
        Wir erheben nur die minimalen Daten, die zur Erbringung unserer Dienstleistungen erforderlich sind. Dies kann Ihre Kontaktinformationen umfassen, wenn Sie uns kontaktieren.
        
        ### Offenlegung von Daten
        Wir schätzen Ihre Privatsphäre über alles. Wir werden Ihre personenbezogenen Daten NICHT an Dritte, Regierungsbehörden oder Einzelpersonen weitergeben, teilen oder verkaufen, es sei denn, dies wird ausdrücklich durch einen gültigen richterlichen Beschluss eines zuständigen Gerichts verlangt.
        
        ### Sicherheit
        Wir setzen Sicherheitsmaßnahmen nach Industriestandard ein, um Ihre Daten vor unbefugtem Zugriff oder unbefugter Offenlegung zu schützen.
        
        ### Ihre Rechte
        Sie haben das Recht, jederzeit Auskunft über Ihre personenbezogenen Daten sowie deren Berichtigung oder Löschung zu verlangen.
      `,
    },
    terms: {
      title: 'AGB',
      content: `
        ### 1. Dienstleistungen
        Yehoshama Software Solutions bietet maßgeschneiderte Softwareentwicklung, mobile Anwendungen und Trading-Bots an. Jedes Projekt unterliegt einer spezifischen Vereinbarung, in der Umfang und Leistungen festgelegt sind.
        
        ### 2. Geistiges Eigentum
        Sämtliche Codes, Designs und Algorithmen bleiben bis zur vollständigen Bezahlung des Projekts Eigentum von Yehoshama Software Solutions. Nach vollständiger Bezahlung geht das Eigentum gemäß der Projektvereinbarung auf den Kunden über.
        
        ### 3. Haftung
        Unsere Haftung ist streng auf den vom Kunden für das jeweilige Projekt oder die jeweilige Dienstleistung gezahlten Gesamtbetrag begrenzt. Wir haften nicht für indirekte, zufällige oder Folgeschäden.
        
        ### 4. Haftungsausschluss für Trading-Bots
        Trading-Bots sind Werkzeuge zur Automatisierung. Wir garantieren keine finanziellen Gewinne. Die Nutzer übernehmen alle mit den Finanzmärkten und dem Handel verbundenen Risiken.
        
        ### 5. Gerichtsstand
        Diese Bedingungen unterliegen den Gesetzen des Staates Israel. Alle Streitigkeiten werden vor den zuständigen Gerichten in Tel Aviv beigelegt.
      `,
    },
    footer: '© 2024 Yehoshama. Alle Rechte vorbehalten.',
    back: 'Zurück zur Startseite',
  },
  he: {
    nav: {
      services: 'שירותים',
      about: 'אודות',
      contact: 'צור קשר',
      privacy: 'פרטיות',
      terms: 'תנאים',
    },
    hero: {
      title: 'יוצרים מצוינות דיגיטלית',
      subtitle: 'אתרים בהתאמה אישית, אפליקציות מובייל, בוטים למסחר ואלגוריתמים מותאמים לצרכי העסק שלך.',
      cta: 'צרו קשר',
    },
    services: {
      title: 'מומחיות',
      items: [
        {
          title: 'פיתוח אתרים',
          description: 'אתרים רספונסיביים בביצועים גבוהים שנבנו בטכנולוגיות מודרניות.',
          icon: Globe,
        },
        {
          title: 'אפליקציות מובייל',
          description: 'פתרונות מובייל נייטיב וקרוס-פלטפורם ל-iOS ואנדרואיד.',
          icon: Smartphone,
        },
        {
          title: 'בוטים למסחר',
          description: 'אסטרטגיות מסחר אוטומטיות ובוטים לשווקים פיננסיים שונים.',
          icon: TrendingUp,
        },
        {
          title: 'תוכנה בהתאמה אישית',
          description: 'אלגוריתמים ופתרונות תוכנה מותאמים אישית לבעיות מורכבות.',
          icon: Code2,
        },
        {
          title: 'קידום דיגיטלי',
          description: 'שיווק דיגיטלי אסטרטגי ואופטימיזציה של הנוכחות המקוונת.',
          icon: Megaphone,
        },
        {
          title: 'בינה מלאכותית ולמידת מכונה',
          description: 'פתרונות בינה מלאכותית מתקדמים ומודלים של למידת מכונה לבינה עסקית.',
          icon: Brain,
        },
        {
          title: 'פתרונות אוטומציה',
          description: 'ייעול תהליכי עבודה באמצעות כלי אוטומציה מותאמים אישית.',
          icon: Zap,
        },
        {
          title: 'איסוף נתונים וחיזוי',
          description: 'איסוף נתונים מתקדם וניתוח חיזוי לקבלת החלטות מושכלות.',
          icon: Database,
        },
      ],
    },
    about: {
      title: 'קצת עלי',
      text: 'אני מפתח תוכנה ייעודי המתמקד באספקת פתרונות איכותיים, ניתנים להרחבה ויעילים. אני גם המייסד של קרן יהושמע, שבה אנו רותמים טכנולוגיה להשפעה חברתית.',
    },
    contact: {
      title: 'בואו נדבר',
      email: 'אימייל',
      github: 'גיטהאב',
      linkedin: 'לינקדאין',
      whatsapp: 'וואטסאפ',
    },
    privacy: {
      title: 'מדיניות פרטיות',
      content: `
        ### איסוף נתונים
        אנו אוספים נתונים מינימליים הדרושים למתן שירותינו. זה עשוי לכלול את פרטי הקשר שלך כאשר אתה פונה אלינו.
        
        ### גילוי נתונים
        אנו מעריכים את הפרטיות שלך מעל הכל. אנו לא נחשוף, נשתף או נמכור את הנתונים האישיים שלך לשום צד שלישי, סוכנות ממשלתית או אדם פרטי, אלא אם כן נדרש במפורש על ידי צו משפטי תקף שהוצא על ידי בית משפט מוסמך.
        
        ### אבטחה
        אנו מיישמים אמצעי אבטחה סטנדרטיים בתעשייה כדי להגן על הנתונים שלך מפני גישה או חשיפה בלתי מורשית.
        
        ### הזכויות שלך
        יש לך את הזכות לבקש גישה, תיקון או מחיקה של הנתונים האישיים שלך בכל עת.
      `,
    },
    terms: {
      title: 'תנאי שימוש',
      content: `
        ### 1. שירותים
        יהושמע פתרונות תוכנה מספקת פיתוח תוכנה בהתאמה אישית, אפליקציות מובייל ובוטים למסחר. כל פרויקט מוסדר בהסכם ספציפי המפרט את ההיקף והתוצרים.
        
        ### 2. קניין רוחני
        כל הקוד, העיצובים והאלגוריתמים נשארים בבעלות יהושמע פתרונות תוכנה עד לקבלת תשלום מלא עבור הפרויקט. עם התשלום המלא, הבעלות מועברת ללקוח בהתאם להסכם הפרויקט.
        
        ### 3. אחריות
        האחריות שלנו מוגבלת אך ורק לסכום הכולל ששולם על ידי הלקוח עבור הפרויקט או השירות הספציפי המדובר. איננו אחראים לכל נזק עקיף, מקרי או תוצאתי.
        
        ### 4. הצהרת בוטים למסחר
        בוטים למסחר הם כלים לאוטומציה. איננו מבטיחים רווחים כספיים. המשתמשים לוקחים על עצמם את כל הסיכונים הקשורים לשווקים פיננסיים ומסחר.
        
        ### 5. סמכות שיפוט
        תנאים אלה כפופים לחוקי מדינת ישראל. כל מחלוקת תיושב בבתי המשפט המוסמכים בתל אביב.
      `,
    },
    footer: '© 2024 יהושמע. כל הזכויות שמורות.',
    back: 'חזרה לדף הבית',
  },
};

const Logo = ({ theme }: { theme: 'light' | 'dark' }) => (
  <svg viewBox="0 0 500 500" className="w-full h-full">
    <circle cx="250" cy="250" r="240" fill={theme === 'dark' ? 'white' : 'black'} stroke="#8B5CF6" strokeWidth="8" />
    <g transform="translate(45, 210) scale(0.85)">
      <path d="M20 10 Q10 10 10 20 L10 80 Q10 90 20 90 L40 90 L40 70 L30 70 L30 30 L40 30 L40 10 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
      <path d="M70 30 L110 50 L70 70 L70 60 L90 50 L70 40 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
      <path d="M150 30 L110 50 L150 70 L150 60 L130 50 L150 40 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
      <path d="M170 10 Q160 10 160 20 L160 80 Q160 90 170 90 L190 90 L190 70 L180 70 L180 30 L180 30 L190 30 L190 10 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
      <path d="M200 10 Q190 10 190 20 L190 80 Q190 90 200 90 L220 90 L220 70 L210 70 L210 30 L220 30 L220 10 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
      <path d="M230 10 Q220 10 220 20 L220 80 Q220 90 230 90 L250 90 L250 70 L240 70 L240 30 L250 30 L250 10 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
      <path d="M260 10 Q250 10 250 20 L250 80 Q250 90 260 90 L280 90 L280 70 L270 70 L270 30 L280 30 L280 10 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
      <path d="M290 10 L300 10 L300 30 L290 30 L290 20 Q290 15 295 15 L300 15 L300 10 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} transform="translate(0, 10)" />
      <path d="M320 30 L360 50 L320 70 L320 60 L340 50 L320 40 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
      <path d="M400 10 Q410 10 410 20 L410 80 Q410 90 400 90 L380 90 L380 70 L390 70 L390 30 L380 30 L380 10 Z" fill={theme === 'dark' ? '#000' : '#22D3EE'} />
    </g>
  </svg>
);

const Particles = ({ theme, view, lang }: { theme: 'light' | 'dark', view: string, lang: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    // Random color from a vibrant palette - high contrast for both themes
    const colors = [
      '139, 92, 246', // Violet
      '6, 182, 212',  // Cyan
      '236, 72, 153', // Pink
      '16, 185, 129', // Emerald
      '245, 158, 11',  // Amber
      '59, 130, 246',  // Blue
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseSize: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 2 + 0.5;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        let opacity = theme === 'dark' ? 0.3 : 0.35;
        let currentColor = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
        let glowSize = 0;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          opacity = Math.min(0.8, opacity + force * 0.5);
          
          // Interpolate between base color (white/black) and the particle's unique color
          const targetColor = this.color.split(',').map(Number);
          const baseColor = (theme === 'dark' ? [255, 255, 255] : [0, 0, 0]);
          
          const r = Math.floor(targetColor[0] * force + baseColor[0] * (1 - force));
          const g = Math.floor(targetColor[1] * force + baseColor[1] * (1 - force));
          const b = Math.floor(targetColor[2] * force + baseColor[2] * (1 - force));
          
          currentColor = `${r}, ${g}, ${b}`;
          glowSize = force * 20;
          this.size = this.baseSize * (1 + force * 2);
        } else {
          this.size = this.baseSize;
        }

        ctx.save();
        if (glowSize > 0) {
          ctx.shadowBlur = glowSize;
          ctx.shadowColor = `rgba(${currentColor}, ${opacity})`;
        }
        
        ctx.fillStyle = `rgba(${currentColor}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (theme === 'light' ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      particles = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 25000, 200);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [theme, view, lang]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = content[lang];
  const currentLangObj = languages.find(l => l.code === lang)!;
  const isRtl = currentLangObj.rtl || false;

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.scrollTo(0, 0);
  }, [lang, isRtl, view, theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogoClick = () => {
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
    }
  };

  const NavItem = ({ href, children, onClick }: { href?: string, children: ReactNode, onClick?: () => void }) => (
    <a 
      href={href} 
      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium cursor-pointer"
      onClick={(e) => {
        setIsMenuOpen(false);
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </a>
  );

  const MarkdownContent = ({ content }: { content: string }) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    return (
      <div className="space-y-6">
        {lines.map((line, i) => {
          if (line.trim().startsWith('###')) {
            return <h3 key={i} className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">{line.replace('###', '').trim()}</h3>;
          }
          return <p key={i} className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">{line.trim()}</p>;
        })}
      </div>
    );
  };

  return (
    <div className={`relative min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'} selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <Particles theme={theme} view={view} lang={lang} />
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white/80 border-zinc-100'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-white border-zinc-700' : 'bg-zinc-900 border-zinc-200'}`}>
              <Logo theme={theme} />
            </div>
            <div className="text-xl font-bold tracking-tighter">
              {lang === 'he' || lang === 'ar' ? 'יהושמע פתרונות תוכנה' : 'YEHOSHAMA SOFTWARE SOLUTIONS'}
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {view === 'home' ? (
              <>
                <NavItem href="#services">{t.nav.services}</NavItem>
                <NavItem href="#about">{t.nav.about}</NavItem>
                <NavItem href="#contact">{t.nav.contact}</NavItem>
              </>
            ) : (
              <NavItem onClick={() => setView('home')}>
                <div className="flex items-center gap-2">
                  {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                  {t.back}
                </div>
              </NavItem>
            )}
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
                >
                  <Languages size={16} />
                  <span>{currentLangObj.flag} {currentLangObj.name}</span>
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute top-full mt-2 ${isRtl ? 'left-0' : 'right-0'} w-48 border rounded-2xl shadow-xl p-2 z-[60] grid grid-cols-1 gap-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${lang === l.code ? (theme === 'dark' ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white') : (theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-50 text-zinc-600')}`}
                        >
                          <span>{l.flag}</span>
                          <span className="font-medium">{l.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800"
            >
              <Languages size={18} />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {(isMenuOpen || isLangMenuOpen) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-20 left-0 w-full border-b p-6 flex flex-col gap-6 md:hidden max-h-[80vh] overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-100'}`}
            >
              {isLangMenuOpen ? (
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangMenuOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${lang === l.code ? (theme === 'dark' ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white') : (theme === 'dark' ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-50 text-zinc-600')}`}
                    >
                      <span>{l.flag}</span>
                      <span className="font-medium">{l.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  {view === 'home' ? (
                    <>
                      <NavItem href="#services">{t.nav.services}</NavItem>
                      <NavItem href="#about">{t.nav.about}</NavItem>
                      <NavItem href="#contact">{t.nav.contact}</NavItem>
                    </>
                  ) : (
                    <NavItem onClick={() => setView('home')}>{t.back}</NavItem>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {view === 'home' ? (
          <>
            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                >
                  <motion.h1 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
                  >
                    {t.hero.title}
                  </motion.h1>
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed"
                  >
                    {t.hero.subtitle}
                  </motion.p>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <a 
                      href="#contact"
                      className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all group ${theme === 'dark' ? 'bg-white text-zinc-900 hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
                    >
                      {t.hero.cta}
                      <motion.span
                        animate={{ x: isRtl ? -5 : 5 }}
                        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                      >
                        {isRtl ? <ArrowRight className="rotate-180" size={20} /> : <ArrowRight size={20} />}
                      </motion.span>
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className={`py-24 px-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-50/80'}`}>
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                  <div className={`h-px flex-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                    {t.services.title}
                  </h2>
                  <div className={`h-px flex-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {t.services.items.map((item, index) => {
                    const colors = ['#8B5CF6', '#06B6D4', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];
                    const randomColor = colors[index % colors.length];
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: `0 0 30px ${randomColor}33`,
                        }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-8 rounded-3xl border transition-all group cursor-default ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}
                        style={{ 
                          // @ts-ignore
                          '--hover-color': randomColor 
                        }}
                      >
                        <div 
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ${theme === 'dark' ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white'}`}
                          style={{ backgroundColor: theme === 'dark' ? 'white' : '#18181b' }}
                        >
                          <div className="group-hover:text-white transition-colors duration-300 flex items-center justify-center w-full h-full rounded-2xl group-hover:bg-[var(--hover-color)]">
                            <item.icon size={24} />
                          </div>
                        </div>
                        <motion.h3 
                          className="text-xl font-bold mb-3 transition-colors group-hover:text-[var(--hover-color)]"
                          whileHover={{ fontWeight: 800 }}
                        >
                          {item.title}
                        </motion.h3>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed group-hover:text-[var(--hover-color)] transition-colors opacity-80 group-hover:opacity-100">
                          {item.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`aspect-square rounded-[40px] overflow-hidden relative ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'}`}
                >
                  <img 
                    src="https://picsum.photos/seed/code/1000/1000" 
                    alt="Workspace" 
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 mix-blend-multiply ${theme === 'dark' ? 'bg-zinc-900/40' : 'bg-zinc-900/10'}`} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                    {t.about.title}
                  </h2>
                  <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                    {t.about.text}
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-3xl font-bold mb-1">50+</div>
                      <div className="text-sm text-zinc-400 uppercase tracking-wider">Projects Done</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">5+</div>
                      <div className="text-sm text-zinc-400 uppercase tracking-wider">Years Exp.</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={`py-24 px-6 rounded-[40px] mx-6 mb-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-zinc-50 text-zinc-900 border border-zinc-100'}`}>
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-7xl font-bold mb-16 tracking-tight">
                  {t.contact.title}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
                  {[
                    { href: "mailto:yehoshama@gmail.com", icon: Mail, label: t.contact.email },
                    { href: "https://wa.me/972534011208", icon: MessageCircle, label: t.contact.whatsapp, target: "_blank" },
                    { href: "https://github.com/Yehoshama/Yehoshama", icon: Github, label: t.contact.github, target: "_blank" },
                    { href: "https://www.linkedin.com/in/yehoshama", icon: Linkedin, label: t.contact.linkedin, target: "_blank" },
                    { href: "https://www.yehoshama.foundation", icon: Globe, label: "Foundation", target: "_blank" }
                  ].map((link, i) => {
                    const colors = ['#8B5CF6', '#06B6D4', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];
                    const randomColor = colors[i % colors.length];
                    
                    return (
                      <motion.a 
                        key={i}
                        href={link.href} 
                        target={link.target}
                        rel={link.target ? "noopener noreferrer" : undefined}
                        className="flex flex-col items-center justify-center gap-4 p-6 rounded-3xl transition-all group relative border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                        whileHover={{ 
                          scale: 1.05,
                          color: randomColor,
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                          boxShadow: `0 0 20px ${randomColor}22`
                        }}
                      >
                        <div 
                          className="p-4 rounded-2xl transition-all duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            color: theme === 'dark' ? 'white' : '#18181b'
                          }}
                        >
                          <link.icon size={32} className="group-hover:text-[var(--icon-color)]" style={{ '--icon-color': randomColor } as any} />
                        </div>
                        <motion.span
                          className="text-lg font-medium break-all text-center"
                          whileHover={{ fontWeight: 700 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.label}
                        </motion.span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="pt-32 pb-20 px-6 min-h-[60vh]">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-12">
                  {view === 'privacy' ? t.privacy.title : t.terms.title}
                </h1>
                <MarkdownContent content={view === 'privacy' ? t.privacy.content : t.terms.content} />
              </motion.div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t transition-colors duration-300 backdrop-blur-sm ${theme === 'dark' ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white/80 border-zinc-100'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-400 text-sm font-medium">
            {t.footer}
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setView('privacy')}
              className="text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest"
            >
              {t.nav.privacy}
            </button>
            <button 
              onClick={() => setView('terms')}
              className="text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest"
            >
              {t.nav.terms}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
