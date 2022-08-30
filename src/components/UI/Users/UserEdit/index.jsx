import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import convertObjToArray from '../../../../utils/convertObjToArray';

import validator, { rules } from '../../../../utils/validator';
import useInput from '../../../../hooks/useInput';
import useUsers from '../../../../hooks/useUsers';

import Input from '../../../common/form/Input';
import Loading from '../../../common/Loading';
import Select from '../../../common/form/Select';
import MultiSelect from '../../../common/form/MultiSelect';
import Radio from '../../../common/form/Radio';
import Btn from '../../../common/form/Btn';
import LableWrapper from '../../../common/form/LableWrapper';

export default function UserEdit({ _id, name, email, profession, qualities, sex }) {
  const [allPrfssns, setAllPrfssns] = useState();
  const [allQualities, setAllQualities] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [nm, ml, sx, prfssos, qlts] =
  [useInput(name), useInput(email), useInput(sex), useInput(profession._id), useInput(qualities)];

  const { getAllProfessions, getAllSex, getAllQualities, updateUser } = useUsers();

  // Professions list and qualities list loading
  useEffect(() => {
    getAllProfessions().then((prfssnList) => setAllPrfssns(convertObjToArray(prfssnList)));
    getAllQualities().then((qltsList) => setAllQualities(convertObjToArray(qltsList)));
  }, []);

  // Edit user info by api
  const handleEdit = async () => {
    try {
      // 1. Get user data by form
      const userData = {
        name: nm.inline.value,
        email: ml.inline.value,
        sex: sx.inline.value,
        profession: allPrfssns.find(({ _id }) => prfssos.inline.value === _id),
        qualities: !!qlts.inline.value?.length
          && qlts.inline.value.map(({ _id }) =>
            allQualities.find(({ _id: originalId }) => originalId === _id)),
      };

      // 2. Validate
      let errorsNum = 0;
      nm.setError(validator(
        rules.isRequired('Имя обязательно для заполнения!'),
      )(userData.name)) && (errorsNum += 1);

      ml.setError(validator(
        rules.isRequired('Email обязателен для заполнения!'),
        rules.isEmail('Неверный формат Email!'),
      )(userData.email)) && (errorsNum += 1);

      prfssos.setError(validator(
        rules.isRequired('Необходимо выбрать профессию!'),
      )(userData.profession)) && (errorsNum += 1);

      qlts.setError(validator(
        rules.isRequired('Необходимо выбрать не менее одного качества!'),
      )(userData.qualities)) && (errorsNum += 1);

      if (!errorsNum) {
        setLoading(true);
        await updateUser(_id, userData);
        setLoading(false);
        navigate(`/users/${_id}`);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading screen />}
      <h2 className="text-center my-3">{`Редактировании пользователя ${name || email || ''}`}</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <LableWrapper label="Имя" {...nm.inline} Element={Input} />
        <LableWrapper label="Электронная почта" {...ml.inline} Element={Input} />
        {allPrfssns
          ? <LableWrapper
              label="Профессия"
              {...prfssos.inline}
              list={allPrfssns}
              Element={Select}
          />
          : <Loading />}
        <LableWrapper
          label="Пол"
          list={getAllSex()}
          {...sx.inline}
          Element={Radio}
        />
        {allQualities
          ? <LableWrapper
              label="Качества"
              list={allQualities}
              {...qlts.inline}
              Element={MultiSelect}
          />
          : <Loading />}
        <Btn className="btn btn-success btn-lg mx-auto" fnClick={async () => await handleEdit()}>Сохранить</Btn>
      </form>
    </>
  );
}

UserEdit.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
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
};

UserEdit.defaultProps = {
  profession: {},
  qualities: [],
  sex: '',
};
