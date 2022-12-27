//   Quy ước tạo rules
// Nếu có lỗi ==> return 'error message'
// Không có lỗi ==> return undefined
function Validator(formSelector) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  let formRules = {};

  let varlidatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập trường này";
    },
    password: function (value) {
      let regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(value)
        ? undefined
        : "Tối thiểu tám ký tự, chữ cái viết hoa, viết thường, số và ký tự đặc biệt";
    },
    min: function (value) {
      let regex = /^[A-Za-z0-9]{6,32}$/;
      return regex.test(value) ? undefined : "Username tối thiểu 6 ký tự";
    },
    min4_6: function (value) {
      let regex = /^[A-Za-z0-9]{4,6}$/;
      return regex.test(value) ? undefined : "ID tối thiểu 4 ký tự";
    },
    nonSpecialValue: function (value) {
      let regex = /^[^'=]{6,32}$/;
      return regex.test(value) ? undefined : "Đầu vào chứa ký tự không hợp lệ";
    },
    phoneNumber: function (value) {
      let regex = /^0[9|8|1|7|3|5]([0-9]|\s|-|\.){8,12}$/;
      return regex.test(value) ? undefined : "Số điện thoại không hợp lệ";
    },
    number: function (value) {
      let regex = /^[0-9]+$/;
      return regex.test(value) ? undefined : "Hãy nhập định dạng số";
    },
  };

  //lấy ra form element trong DOM theo 'formSelector'
  let formElement = document.querySelector(formSelector);
  //Chỉ xử lý khi có element trong DOM
  if (formElement) {
    let inputs = formElement.querySelectorAll("[name][rules]");
    for (let input of inputs) {
      let rules = input.getAttribute("rules").split("|");
      for (let rule of rules) {
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(varlidatorRules[rule]);
        } else {
          formRules[input.name] = [varlidatorRules[rule]];
        }
      }

      // Lắng nghe sự kiện để validate (blur, change, ...)

      input.onblur = handleValidate;
      input.oninput = handleClearErrors;
    }
    //Hàm Thực hiện validate
    function handleValidate(event) {
      var rules = formRules[event.target.name];
      var errorMessage;
      for (let rule of rules) {
        errorMessage = rule(event.target.value);
        if (errorMessage) {
          break;
        }
      }

      //Nếu có lỗi thì hiển thi message lỗi ra UI

      if (errorMessage) {
        let formGroup = getParent(event.target, ".form-group");

        if (formGroup) {
          let formInput = formGroup.querySelector(".input-box");
          formInput.classList.add("invalid");
          let formMessage = formGroup.querySelector("#error");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }

      return !errorMessage; //validate thành công
    }
    //Hàm clear message lỗi
    function handleClearErrors(event) {
      let formGroup = getParent(event.target, ".form-group");
      let formInput = formGroup.querySelector(".input-box");
      if (formInput.classList.contains("invalid")) {
        formInput.classList.remove("invalid");
        let formMessage = formGroup.querySelector("#error");
        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }
  }
  //Xử lý hành vi submit
  formElement.onsubmit = function (event) {
    event.preventDefault();
    let inputs = formElement.querySelectorAll("[name][rules]");
    let isValid = true;

    for (let input of inputs) {
      if (!handleValidate({ target: input })) {
        isValid = false;
      }
    }

    //Khi không có lỗi thì submit form
    if (isValid) {
      formElement.submit();
    }
  };
}
