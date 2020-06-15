import simpimage from "../../assets/simple.jpg";
const initState = {
  posts: [
    {
      postcontent:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,repellendus inventore ad mollitia harum sit eius voluptas officiadolore quam?",
      userName: "Nagasai jihtin",
      date: "today 3:00pm",
      image: false,
      likescount: "20",
      commentscount: "10",
    },
    {
      postcontent:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,repellendus inventore ad mollitia harum sit eius voluptas officiadolore quam?",
      userName: "nandhu",
      date: "today 2:36pm",
      image: false,
      likescount: "10",
      commentscount: "50",
    },
    {
      postcontent:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,repellendus inventore ad mollitia harum sit eius voluptas officiadolore quam?",
      userName: "jesse",
      date: "today 4:76pm",
      image: false,
      likescount: "60",
      commentscount: "90",
    },
    {
      postcontent:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,repellendus inventore ad mollitia harum sit eius voluptas officiadolore quam?",
      userName: "suresh",
      date: "today 00:76pm",
      image: simpimage,
      likescount: "60",
      commentscount: "90",
    },
    {
      postcontent:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,repellendus inventore ad mollitia harum sit eius voluptas officiadolore quam?",
      userName: "geetha",
      date: "today 8:76pm",
      image: simpimage,
      likescount: "60",
      commentscount: "90",
    },
    {
      postcontent:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,repellendus inventore ad mollitia harum sit eius voluptas officiadolore quam?",
      userName: "muzakir",
      date: "today 1:76pm",
      image: false,
      likescount: "60",
      commentscount: "90",
    },
    {
      postcontent:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,repellendus inventore ad mollitia harum sit eius voluptas officiadolore quam?",
      userName: "ajay",
      date: "today 7:50am",
      image: simpimage,
      likescount: "10",
      commentscount: "20",
    },
  ],
};
const getPostReducer = (state = initState, actions) => {
  return state;
};

export default getPostReducer;
