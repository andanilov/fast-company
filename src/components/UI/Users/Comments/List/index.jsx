import React from 'react';
import PropTypes from 'prop-types';
import getAvatarSrcById from '../../../../../utils/getAvatarSrcById';
import getTimeLeft from '../../../../../utils/getTimeLeft';

const List = ({ commentsList, handlerRemove }) =>
  commentsList.map(({ _id, content, name, userId, sex, created_at: createdAt }) => (
    <div className="row my-4" key={_id}>
      <div className="col">
        <div className="d-flex flex-start">
          <img
            src={getAvatarSrcById(userId, sex)}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="65"
            height="65"
          />
          <div className="flex-grow-1 flex-shrink-1">
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1 fs-5">
                  {name}
                  &nbsp;
                  <span className="small">
                    {getTimeLeft(createdAt)}
                  </span>
                </p>
                <button className="btn btn-sm text-primary d-flex align-items-center" type="button">
                  <i className="bi bi-x-lg fs-3" onClick={handlerRemove(_id)}>&#215;</i>
                </button>
              </div>
              <p className="small mb-0 text-start">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

List.propTypes = {
  commentsList: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default List;
