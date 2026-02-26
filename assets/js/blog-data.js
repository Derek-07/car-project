// Blog Articles Data
const blogArticles = [
    {
        id: 1,
        title: "Set Your 2026 Resolutions in Style: How a Supercar Drive Can Kickstart Your Year in Dubai",
        date: "Jan 1, 2026",
        author: "Admin",
        image: "assets/img/blog/blog-s-1-1.jpg",
        category: "Car News",
        tags: ["Car Dealership", "Maintenance"],
        excerpt: "BMW X6 M50i is designed to exceed your sportiest.",
        content: `
            <p>We offer various warranty plans on both new and certified pre-owned vehicles. These plans can cover essential components like the engine, transmission, and electrical systems, with options for extended coverage. Yes, we encourage customers to schedule test drives to experience our vehicles firsthand. You can book a test drive online or visit our dealership to explore our inventory in person. Certified pre-owned (CPO) vehicles go through a rigorous inspection and certification process, ensuring they meet high standards for quality and reliability. CPO vehicles typically come with extended warranties and additional perks.</p>

            <p>Absolutely! We offer a convenient trade-in program where you can get a fair market value for your current vehicle, which can be applied to your new purchase. Bring your car in for an on-the-spot appraisal! Please bring a valid driver's license, proof of insurance, proof of income (if financing), and any trade-in documentation if you're trading in a vehicle. This will help streamline the purchasing process</p>

            <blockquote>
                <p>Digital agencies leverage a variety of technologies and tools to support their services and streamline their workflows.</p>
                <cite>Michel Clarck</cite>
            </blockquote>

            <p>Our online inventory allows you to browse our entire selection of vehicles from the comfort of your home. With detailed descriptions, photos, and vehicle comparisons, you can easily research and shortlist your favorites before even visiting the dealership. We also offer online appointment scheduling, trade-in appraisals, and financing pre-approval, making the entire car-buying process as convenient and efficient as possible.</p>

            <p>We put customer satisfaction at the heart of everything we do. From the moment you step into our dealership to the moment you drive away, our friendly and knowledgeable staff are here to ensure you have a positive experience. Our customer testimonials and high ratings reflect our dedication to providing exceptional service, and we work hard to build long-lasting relationships with every client. We offer a variety of certified pre-owned vehicles, each inspected and certified for quality and reliability, giving you peace of mind when purchasing a used vehicle.</p>
        `,
        innerImages: ["assets/img/blog/blog_inner_1.jpg", "assets/img/blog/blog_inner_2.jpg"],
        comments: [
            {
                id: 1,
                author: "Mariya Dsuza",
                date: "23 feb, 2025 06:30pm",
                avatar: "assets/img/blog/comment-author-1.jpg",
                text: "Many of our vehicles come with extended warranties and service contracts, ensuring your investment is protected for years to come.",
                replies: [
                    {
                        id: 2,
                        author: "Michel Phelops",
                        date: "23 feb, 2025 06:30pm",
                        avatar: "assets/img/blog/comment-author-2.jpg",
                        text: "We value honesty and integrity, ensuring that our customers feel confident and informed throughout the entire purchasing process."
                    }
                ]
            },
            {
                id: 3,
                author: "Michel Alex",
                date: "23 feb, 2025 06:30pm",
                avatar: "assets/img/blog/comment-author-3.jpg",
                text: "We provide on-the-spot appraisals, ensuring you get a fair price for your trade-in, which can be applied to your next purchase.",
                replies: []
            }
        ]
    },
    {
        id: 2,
        title: "Winter in the Fast Lane: Why December is the Best Month to Drive in Dubai",
        date: "Dec 31, 2025",
        author: "Admin",
        image: "assets/img/blog/2.jpg",
        category: "Car News",
        tags: ["Dubai", "Driving"],
        excerpt: "Experience the perfect weather conditions for luxury supercar driving.",
        content: `
            <p>December in Dubai offers the perfect climate for supercar driving. With temperatures ranging between 20-30°C, the weather is ideal for experiencing the full potential of high-performance vehicles without the intensity of summer heat.</p>

            <p>The UAE's winter season provides excellent road conditions and visibility. Combined with Dubai's world-class infrastructure and scenic routes, December becomes the ultimate month for automotive enthusiasts to explore the capabilities of luxury and sports cars.</p>

            <blockquote>
                <p>December is not just about the holidays; it's about creating unforgettable memories on the open road.</p>
                <cite>Luxury Car Expert</cite>
            </blockquote>

            <p>From desert drives to coastal routes, Dubai's diverse landscapes are best experienced during the winter months. The comfortable weather allows drivers to maximize their time behind the wheel and truly appreciate the engineering excellence of premium vehicles.</p>

            <p>Whether you're planning a holiday adventure or simply want to enjoy the finest driving experience, December is undoubtedly the best month to rent and drive a supercar in Dubai.</p>
        `,
        innerImages: ["assets/img/blog/blog_inner_1.jpg", "assets/img/blog/blog_inner_2.jpg"],
        comments: []
    },
    {
        id: 3,
        title: "The Ultimate Supercar Ranking: Dubai's Most Popular Cars and What They're Best For",
        date: "Dec 25, 2025",
        author: "Admin",
        image: "assets/img/blog/3.jpg",
        category: "Car Review",
        tags: ["Supercar", "Ranking"],
        excerpt: "Discover which supercars dominate Dubai's luxury rental market.",
        content: `
            <p>Dubai's supercar rental market features an impressive array of high-performance vehicles. From the iconic Ferrari F8 Tributo to the powerful Lamborghini Huracán, each vehicle offers unique characteristics and performance metrics.</p>

            <p>The ranking is based on popularity, performance, and rental frequency. Different supercars excel in different areas - some are perfect for speed enthusiasts, while others cater to those seeking comfort and luxury during long drives.</p>

            <blockquote>
                <p>Every supercar has its story. Dubai's vehicles are here to help you write yours.</p>
                <cite>Supercar Enthusiast</cite>
            </blockquote>

            <p>Understanding which car is best for your specific needs - whether it's track performance, highway comfort, or photogenic styling - is crucial for selecting the perfect supercar for your Dubai experience.</p>

            <p>Explore our comprehensive guide to find the vehicle that matches your driving style and preferences.</p>
        `,
        innerImages: ["assets/img/blog/blog_inner_1.jpg", "assets/img/blog/blog_inner_2.jpg"],
        comments: []
    },
    {
        id: 4,
        title: "A Supercar Christmas in Dubai: The Ultimate Gift of Experience",
        date: "Dec 15, 2025",
        author: "Admin",
        image: "assets/img/blog/4.jpg",
        category: "Lifestyle",
        tags: ["Christmas", "Experience"],
        excerpt: "Transform your holiday season with an unforgettable supercar adventure.",
        content: `
            <p>Christmas in Dubai takes on a whole new meaning when experienced from behind the wheel of a supercar. Imagine cruising through the illuminated streets of Dubai in a stunning Ferrari, Lamborghini, or Porsche.</p>

            <p>A supercar experience is more than just driving - it's creating memories, enjoying the finer things in life, and celebrating with style. Whether you're planning a romantic getaway or a family adventure, a luxury supercar rental adds that special touch to your holiday season.</p>

            <blockquote>
                <p>The best gifts are experiences, and Dubai's supercars deliver just that.</p>
                <cite>Travel Enthusiast</cite>
            </blockquote>

            <p>From Christmas shopping expeditions to New Year's Eve celebrations, a supercar transforms ordinary moments into extraordinary memories. Premium comfort, cutting-edge technology, and unmatched performance combine to create the ultimate holiday experience.</p>

            <p>Book your supercar experience this holiday season and make it truly unforgettable.</p>
        `,
        innerImages: ["assets/img/blog/blog_inner_1.jpg", "assets/img/blog/blog_inner_2.jpg"],
        comments: []
    },
    {
        id: 5,
        title: "The Rise of Luxury Supercars Dubai: The Story So Far",
        date: "Dec 5, 2025",
        author: "Admin",
        image: "assets/img/blog/5.jpg",
        category: "Industry",
        tags: ["Market", "Luxury"],
        excerpt: "Tracing the evolution of Dubai's supercar rental industry.",
        content: `
            <p>Dubai's luxury supercar rental industry has experienced remarkable growth over the past decade. What started as a niche service has transformed into a thriving market catering to tourists and residents alike.</p>

            <p>The rise of supercar rentals in Dubai reflects the city's positioning as a global luxury destination. World-class infrastructure, favorable weather, and a cosmopolitan population create the perfect environment for this premium segment.</p>

            <blockquote>
                <p>Dubai isn't just about buildings - it's about the lifestyle, the dreams, and the supercars that make it possible.</p>
                <cite>Industry Observer</cite>
            </blockquote>

            <p>Technology advances, improved customer service, and a wider variety of premium vehicles have made supercar experiences more accessible than ever. The competitive market ensures quality, reliability, and exceptional service standards.</p>

            <p>Looking ahead, the industry continues to evolve with electric supercars, enhanced digital booking systems, and innovative experience packages shaping the future.</p>
        `,
        innerImages: ["assets/img/blog/blog_inner_1.jpg", "assets/img/blog/blog_inner_2.jpg"],
        comments: []
    },
    {
        id: 6,
        title: "Winter in Dubai: Why It's the Best Season for Self-Driving a Supercar",
        date: "Nov 24, 2025",
        author: "Admin",
        image: "assets/img/blog/6.jpg",
        category: "Driving Tips",
        tags: ["Season", "Driving"],
        excerpt: "Discover why winter is the ultimate season for supercar driving in Dubai.",
        content: `
            <p>Winter transforms Dubai into a supercar paradise. The mild temperatures, comfortable humidity levels, and clear skies create ideal driving conditions that enthusiasts dream about all year.</p>

            <p>Unlike summer's intense heat, winter allows drivers to fully appreciate their vehicle without concerns about overexertion or discomfort. Long cruises, spirited driving, and extended track sessions become truly enjoyable experiences.</p>

            <blockquote>
                <p>Winter in Dubai is when supercars truly come alive.</p>
                <cite>Driving Expert</cite>
            </blockquote>

            <p>The extended daylight hours combined with excellent road visibility provide safe conditions for both experienced drivers and those new to high-performance vehicles. Dubai's diverse landscape - from city streets to desert vistas - offers exciting routes for every preference.</p>

            <p>Premium braking systems perform optimally, tires maintain perfect grip, and engines purr at their best. Winter is definitely the season to experience the full potential of Dubai's stunning supercar collection.</p>
        `,
        innerImages: ["assets/img/blog/blog_inner_1.jpg", "assets/img/blog/blog_inner_2.jpg"],
        comments: []
    }
];

// Function to get article by ID
function getArticleById(id) {
    return blogArticles.find(article => article.id === parseInt(id));
}

// Function to get all articles
function getAllArticles() {
    return blogArticles;
}
