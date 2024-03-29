export const activeStoreName = "stores/annies";

export const activeImageDomain = "https://storagemedia.corporategear.com"


export const SLICK_SETTINGS = {

    dots: false,

    infinite: false,

    speed: 500,

    arrow: false,

    slidesToShow: 4,

    slidesToScroll: 1,

    autoplay: false,

    responsive: [

        {

            breakpoint: 1601,

            settings: {

                slidesToShow: 5,

                slidesToScroll: 1,

                dots: false,

            },

        },

        {

            breakpoint: 1399,

            settings: {

                slidesToShow: 4,

                slidesToScroll: 1,

                dots: false,

            },

        },

        {

            breakpoint: 1199,

            settings: {

                slidesToShow: 3,

                slidesToScroll: 1,

                dots: false,

            },

        },

        {

            breakpoint: 768,

            settings: {

                slidesToShow: 2,

                slidesToScroll: 1,

                dots: false,

                initialSlide: 1,

                infinite: true,

                centerMode: true,

                centerPadding: '20px',

            },

        },

        {

            breakpoint: 610,

            settings: {

                slidesToShow: 1,

                slidesToScroll: 1,

                infinite: true,

                dots: false,

                centerMode: true,

                centerPadding: '100px',

            },

        },

        {

            breakpoint: 480,

            settings: {

                slidesToShow: 1,

                slidesToScroll: 1,

                infinite: true,

                dots: false,

                centerMode: true,

                centerPadding: '20px',

            },

        },

    ],

};