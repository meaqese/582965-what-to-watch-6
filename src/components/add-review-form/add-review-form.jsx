import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

import {addComment} from "../../store/api-actions";
import {setCommentsError} from "../../store/action";


const AddReviewForm = ({id}) => {
  const [isReady, setReady] = useState(false);
  const [data, setData] = useState({});
  const {errorComments} = useSelector((state) => state.PROCESSES);
  const dispatch = useDispatch();

  const formRef = useRef();

  const handleFormChange = () => {
    const formData = new FormData(formRef.current);

    const rating = formData.get(`rating`);
    const reviewText = formData.get(`review-text`);

    if (rating && (reviewText.length >= 50 && reviewText.length <= 400)) {
      setReady(true);
      setData({rating: +rating, comment: reviewText});
    } else {
      setReady(false);
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (isReady) {
      dispatch(addComment(id, data));
    }
  };


  return (
    <form className="add-review__form" ref={formRef} onChange={handleFormChange} onSubmit={handleFormSubmit}>
      {errorComments}
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
          <label className="rating__label" htmlFor="star-1">Rating 1</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6"/>
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7"/>
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8"/>
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9"/>
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-10" type="radio" name="rating" value="10"/>
          <label className="rating__label" htmlFor="star-10">Rating 10</label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"/>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isReady}>Post</button>
        </div>
      </div>
    </form>
  );
};

AddReviewForm.propTypes = {
  id: PropTypes.number.isRequired
};

export default AddReviewForm;
