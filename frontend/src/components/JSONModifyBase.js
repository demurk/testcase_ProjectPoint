import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { defaultPath } from "../App";

const JSONModifyBase = ({ saveAction, data = null}) => {
  const [textareaValue, setTextareaValue] = useState(data ? JSON.stringify(data) : '');
  const navigate = useNavigate();

  const navigateBackOrDefault = () => {
    if (navigate.length > 1) {
      navigate(-1);
    } else {
      navigate(defaultPath)
    }
  }

  return (
    <div className="modal-container">
      <h3 className="pointer" onClick={navigateBackOrDefault}>Вернуться назад</h3>
      <div className="modal-content">
        <textarea className="modal-textarea"
          onChange={(e) => setTextareaValue(e.target.value)}
          value={textareaValue}
        />

        <div className="modal-buttons">
          <button
            className="modal-button"
            onClick={navigateBackOrDefault}
          >
            Отменить
          </button>
          <button
            className="modal-button"
            onClick={() => saveAction(textareaValue)}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default JSONModifyBase;