document.addEventListener("DOMContentLoaded", function () {
  const html = (data) => {
    return `
    <div class="container">
        <section>
            <label for="nameU">Nombre</label>
            <input id="nameU" name="nameU" type="text" value="${
              data.name || ""
            }">
        </section>
        <section>
            <label for="lastnameU">Apellido</label>
            <input id="lastnameU" name="lastnameU" type="text" value="${
              data.lastname || ""
            }">
        </section>
        <section>
            <label for="passwordU">Contraseña</label>
            <input id="passwordU" name="passwordU" type="password">
        </section>
        <section>
            <label for="email-u">E-mail</label>
            <input id="emailU" name="emailU" type="text" value="${
              data.email || ""
            }">
        </section>
        <section>
            <label for="active">Activo</label>
            <input id="active" name="active" type="checkbox" ${
              data.isActive ? "checked" : ""
            }>
        </section>
        <section>
            <label for="admin">Admin</label>
            <input id="admin" name="admin" type="checkbox" ${
              data.isAdmin ? "checked" : ""
            }>
        </section>
    </div>
    <button class="register" type="submit">Actualizar</button>
    `;
  };

  const userDiv = document.getElementById("container-users");
  const changeDiv = document.getElementById("change-div");

  const selectUser = () => {
    const userUpdateForm = document.getElementById("user-update");
    const formData = new FormData(userUpdateForm);

    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formDataJsonString,
    };

    fetch("/user-details", postData)
      .then((response) => response.json())
      .then((data) => {
        userDiv.innerHTML = "";
        changeDiv.innerHTML = "";
        userDiv.innerHTML += html(data.data);
        
        if (data.data.email !== "") {
          changeDiv.innerHTML += `
        <input id="uid" name="user" type="hidden" value="${data.data.id || ""}">
        <button class="psw-change" type="submit">Solicitar Cambio Contraseña</button>
        `;
        }
      });
  };
  // Handle change
  const userSelect = document.getElementById("user-select");
  userSelect.addEventListener("change", selectUser);
});
