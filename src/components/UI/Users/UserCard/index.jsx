import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../api';

import Badges from '../../../common/Badges';
import Card from '../../../common/Card';
import UserInfo from './UserInfo';
import CommentsList from '../Comments/List';
import CommentAdd from '../Comments/Add';
import Loading from '../../../common/Loading';

const UserCard = ({ _id, name, sex, profession, qualities, completedMeetings, rate }) => {
  const [commentsList, setCommentsList] = useState();
  const [allAuthors, setAllAuthors] = useState();
  const [loading, setLoading] = useState(false);

  const getNameSexById = useCallback((users) => users.reduce((acc, { _id, name, sex }) =>
    ({ ...acc, [_id]: { name, sex } }), {}), []);

  const loadComments = useCallback(async () => {
    try {
      setCommentsList();
      // Get comments without users names and sex
      let cmmnts = await api.comments.fetchCommentsForUser(_id);

      if (!cmmnts?.length) {
        return setCommentsList([]);
      }

      // Add authors names to comments
      const athrIds = [...new Set(cmmnts.map(({ userId }) => userId))];
      const athr = await api.users.fetchUserByIds(athrIds);
      // const idNameSex = athr.reduce((acc, { _id, name, sex }) =>
      //   ({ ...acc, [_id]: { name, sex } }), {});
      // const idNameSex = getNameSexById(athr);
      cmmnts = cmmnts.map((ath) => ({ ...ath, ...getNameSexById(athr)[ath.userId] }));

      return setCommentsList(cmmnts);
    } catch (e) {
      console.log('не удалось загрузить комментарии или их авторов ', e.message);
    }
    return true;
  }, []);

  // First loading comments and authors
  useEffect(() => { (async function () { loadComments(); }()); }, []);

  // Load all authors for add comment form
  useEffect(() => { api.users.fetchAll().then((users) => setAllAuthors(users)); }, []);

  const handlerRemoveComment = useCallback((id) => async () => {
    try {
      setLoading(true);
      await api.comments.remove(id);
      commentsList?.length && setCommentsList(commentsList.filter(({ _id }) => _id !== id));
    } catch (e) {
      console.log('Не удалось удалить комментарий!', e.message);
    } finally {
      setLoading(false);
    }
  }, [commentsList]);

  const addComment = useCallback(async (userId, content) => {
    try {
      setLoading(true);
      const newComment = await api.comments.add({ pageId: _id, userId, content });
      setCommentsList([...commentsList, { ...newComment, ...getNameSexById(allAuthors)[userId] }]);
    } catch (e) {
      console.log('Не удалось добавить комментарий!', e.message);
    } finally {
      setLoading(false);
    }
  }, [commentsList, allAuthors]);

  return (
    <>
      {!!loading && <Loading screen />}
      <div className="container-xxl my-4">
        <div className="row g-3 align-items-start">
          <aside className="col-md-12 col-lg-4 col-xl-3 d-grid gap-3">
            <Card>
              <UserInfo
                _id={_id}
                name={name}
                sex={sex}
                profession={profession?.name || ''}
                rate={rate}
              />
            </Card>

            {qualities.length && (
              <Card subTitle="Качества">
                <Badges nameColors={qualities} />
              </Card>
            )}

            <Card subTitle="Количество встреч">
              <h1 className="display-1">{completedMeetings}</h1>
            </Card>
          </aside>
          <main className="col-md-12 col-lg-8 col-xl-9 d-grid gap-3">
            {allAuthors === undefined
              ? <Loading inline />
              : !!allAuthors?.length && (
                <Card title="Добавить комментарий" align="left">
                  <CommentAdd
                    allAuthors={allAuthors}
                    addComment={addComment}
                  />
                </Card>)}

            {commentsList === undefined
              ? <Loading inline />
              : !!commentsList?.length &&
                <Card title="Комментарии" align="left">
                  <CommentsList
                    commentsList={commentsList}
                    handlerRemove={handlerRemoveComment}
                  />
                </Card>}
          </main>
        </div>
      </div>
    </>
  );
};

UserCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.string,
  profession: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
  qualities: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
  })),
  completedMeetings: PropTypes.number,
  rate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

UserCard.defaultProps = {
  profession: {},
  qualities: [],
  completedMeetings: 0,
  rate: false,
  sex: '',
};

export default UserCard;
