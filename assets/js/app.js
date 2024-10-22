const showMovieBtn = document.getElementById("showMovieBtn");
const backDrop = document.getElementById("backDrop");
const moviemodel = document.getElementById("moviemodel");
const closeToggle = [...document.querySelectorAll(".closeToggle")];
const movieForm = document.getElementById("movieForm");
const movieTitlecontrol = document.getElementById("movieTitle");
const movieURLcontrol = document.getElementById("movieURL");
const overviewcontrol = document.getElementById("overview");
const ratingcontrol = document.getElementById("rating");
const movieContainer = document.getElementById("movieContainer");
const sumbitbtn = document.getElementById("sumbitbtn");
const updateBtn = document.getElementById("updateBtn");

const movieArr = [
];

uuid = () => {
   return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(
      /[xy]/g,
      (character) => {
         const random = (Math.random() * 16) | 0;
         const value = character === "x" ? random : (random & 0x3) | 0x8;

         return value.toString(16);
      }
   );
};

let editId;
const onEdit = (ele) => {
   movieModelhandler();
   editId = ele.closest(".card").id;
   let editObj = movieArr.find((ele) => ele.movieId === editId);

   movieTitlecontrol.value = editObj.movieTitle;
   movieURLcontrol.value = editObj.movieURL;
   overviewcontrol.value = editObj.overview;
   ratingcontrol.value = editObj.rating;

   updateBtn.classList.remove("d-none");
   sumbitbtn.classList.add("d-none");
};

const onRemove = (ele) => {


    console.log(ele);
    // moviehidehandler()
    console.log(ele.closest('.card').id);


    let removeId = ele.closest('.card').id;
    let getindex = movieArr.findIndex(movie => movie.movieId === removeId)
    movieArr.splice(getindex, 1);
    console.log(movieArr);
    ele.closest('.col-md-6').remove();

  
};

const createMovieCards = (arr) => {
   let movieCardResult = "";
   arr.forEach((movie) => {
      // console.log(movie);
      movieCardResult += `
                        <div class="col-md-6 col-lg-3 mb-4 cardbg">
                            <div class="card" id=${movie.movieId}>
                                <div class="card-header cardbg">
                                    <h4 class="mb-0">${movie.movieTitle}</h4>
                                </div>
                                <div class="card-body cardbg">
                                    <figure class="movieCard">
                                        <img
                                        src="${movie.movieURL}"
                                        alt="${movie.movieTitle}"
                                        title="${movie.movieTitle}"
                                        />
                                        <figcaption>
                                            <div class="movieTitle">
                                                <div class="row">
                                                    <div class="col-10">
                                                        <h4 class="m-0">
                                                            ${movie.movieTitle}
                                                        </h4>
                                                    </div>
                                                    <div class="col-2 rating text-center">
                                                        <span
                                                            class="${setClassRating(
                                                               movie.rating
                                                            )}">${movie.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="movieOverview">
                                                <h4 class="mb-0">${
                                                   movie.movieTitle
                                                }</h4>
                                                <h4>
                                                    <em>Overview</em>
                                                </h4>
                                                <p class="m-0 mt-2">
                                                    ${movie.overview}
                                                </p>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div class="card-footer d-flex justify-content-between cardbg">
                                    <button class="btn btn-sm edit-bg" onclick="onEdit(this)">Edit</button>
                                    <button class="btn btn-sm ntflx-btn-pri" onclick="onRemove(this)">Remove</button>
                                </div>
                            </div>
                        </div>
                        `;
   });
   movieContainer.innerHTML = movieCardResult;
};
createMovieCards(movieArr);

const creeateele = (newMovieObj) => {
   let cardDiv = document.createElement("div");
   cardDiv.className = `col-md-6 col-lg-3 mb-4 cardbg`;
   cardDiv.innerHTML = `<div class="card" id=${newMovieObj.movieId}>
                                <div class="card-header cardbg">
                                    <h4 class="mb-0">${
                                       newMovieObj.movieTitle
                                    }</h4>
                                </div>
                                <div class="card-body cardbg">
                                    <figure class="movieCard">
                                        <img
                                        src="${newMovieObj.movieURL}"
                                        alt="${newMovieObj.movieTitle}"
                                        title="${newMovieObj.movieTitle}"
                                        />
                                        <figcaption>
                                            <div class="movieTitle">
                                                <div class="row">
                                                    <div class="col-10">
                                                        <h4 class="m-0">
                                                            ${
                                                               newMovieObj.movieTitle
                                                            }
                                                        </h4>
                                                    </div>
                                                    <div class="col-2 rating text-center">
                                                        <span
                                                            class="${setClassRating(
                                                               newMovieObj.rating
                                                            )}">${
      newMovieObj.rating
   }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="movieOverview">
                                                <h4 class="mb-0">${
                                                   newMovieObj.movieTitle
                                                }</h4>
                                                <h4>
                                                    <em>Overview</em>
                                                </h4>
                                                <p class="m-0 mt-2">
                                                    ${newMovieObj.overview}
                                                </p>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div class="card-footer d-flex justify-content-between cardbg">
                                    <button class="btn btn-sm edit-bg" onclick="onEdit(this)">Edit</button>
                                    <button class="btn btn-sm ntflx-btn-pri" onclick="onRemove(this)">Remove</button>
                                </div>
                            </div>`;

   movieContainer.prepend(cardDiv);
};

const movieModelhandler = () => {
   movieForm.reset();
   backDrop.classList.toggle("active");
   moviemodel.classList.toggle("active");
};

const onsubmitForm= (eve) => {
   eve.preventDefault();
   let newMovieObj = {
      movieTitle: movieTitlecontrol.value,
      movieURL: movieURLcontrol.value,
      overview: overviewcontrol.value,
      rating: ratingcontrol.value,
      movieId: uuid(),
   };
   movieArr.unshift(newMovieObj);
   eve.target.reset();
   creeateele(newMovieObj);
   movieModelhandler();

   Swal.fire({
      position: "center",
      icon: "success",
      title: `new movie ${newMovieObj.movieTitle} added`,
      timer: 2500,
   });
};

const onupdateBtn = () => {
   let updatedMovie = {
      movieTitle: movieTitlecontrol.value,
      movieURL: movieURLcontrol.value,
      overview: overviewcontrol.value,
      rating: ratingcontrol.value,
      movieId: editId,
   };
   const updateIndex = movieArr.findIndex((ele) => ele.movieId === editId);
   movieArr[updateIndex] = updatedMovie;
   createMovieCards(movieArr);
   movieModelhandler();
   Swal.fire({
    position: "center",
    icon: "success",
    title: `new movie ${updatedMovie.movieTitle} updated`,
    timer: 2500,
 });
};

showMovieBtn.addEventListener("click", movieModelhandler);
closeToggle.forEach((ele) => {
   ele.addEventListener("click", movieModelhandler);
});

movieForm.addEventListener("submit", onsubmitForm);
updateBtn.addEventListener("click", onupdateBtn);

function setClassRating(rating) {
   if (rating <= 2) {
      return "bg-danger";
   } else if (rating > 3 && rating < 4) {
      return "bg-warning";
   } else {
      return "bg-success";
   }
}