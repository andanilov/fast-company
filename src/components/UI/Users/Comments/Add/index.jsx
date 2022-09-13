import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../../../../hooks/useInput';
import validator, { rules } from '../../../../../utils/validator';

import Btn from '../../../../common/form/Btn';
import LableWrapper from '../../../../common/form/LableWrapper';
import Select from '../../../../common/form/Select';
import Textarea from '../../../../common/form/Textarea';

const Add = ({ allAuthors, addComment }) => {
  const [author, content] = [useInput(), useInput()];

  const handlerAdd = async () => {
    // 1. Validate
    let errorsNum = 0;

    author.setError(validator(
      rules.isRequired('Необходимо выбрать автора!'),
    )(author.inline.value)) && (errorsNum += 1);

    content.setError(validator(
      rules.isRequired('Необходимо ввести сообщение!'),
    )(content.inline.value)) && (errorsNum += 1);

    if (!errorsNum) {
      try {
        await addComment(author.inline.value, content.inline.value);
        content.setValue('');
      } catch (e) {
        console.log('Ошибка при добавлении комментария ', e.message);
      }
    }
  };

  return (
    <>
      <LableWrapper
        label="Автор комментария"
        {...author.inline}
        list={allAuthors}
        Element={Select}
      />
      <LableWrapper
        label="Сообщение"
        {...content.inline}
        Element={Textarea}
        rows="4"
      />
      <Btn
        className="btn btn-success btn-lg mx-auto"
        fnClick={handlerAdd}
      >
        Опубликовать
      </Btn>
    </>
  );
};

Add.propTypes = {
  allAuthors: PropTypes.oneOfType([PropTypes.array]).isRequired,
  addComment: PropTypes.func.isRequired,
};

export default Add;
