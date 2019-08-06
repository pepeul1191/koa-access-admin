import _ from 'underscore';

var UserSystemListTemplate = _.template(`
  <h2 class="page-tittle">Gestión de Sistemas del Usuario</h2>
  <br>
  <div class="row">
    <div class="col-md-6">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Usuario</th>
            <th scope="col">Correo</th>
            <th scope="col" class="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          <% for (var i = 0; i < users.length; i++){ %>
          <tr>
            <td><%= users[i].user %></td>
            <td><%= users[i].email %></td>
            <td class="text-center">
              <a href="<%= base_url %>#/user/edit/<%= users[i]._id %>">
                <i class="fa fa-pencil row-icon" aria-hidden="true"></i>
              </a>
              <a href="<%= base_url %>#/user/mail/<%= users[i]._id %>">
                <i class="fa fa-envelope row-icon" aria-hidden="true"></i>
              </a>
              <a href="<%= base_url %>#/user/<%= users[i]._id %>/system">
                <i class="fa fa-desktop row-icon" aria-hidden="true"></i>
              </a>
            </td>
          </tr>
          <% } %>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="1">
              <a href="<%= base_url %>#/user/create" class="btn btn-primary pull-right">
                <i class="fa fa-plus btn-icon" aria-hidden="true"></i>
                Agregar Registro
              </a>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="col-md-6">
      <h3 class="page-tittle">Criterios de Búsqueda</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="user">Usuario</label>
            <input type="text" class="form-control" id="user" aria-describedby="userHelp" placeholder="Ingrese usuario">
            <small id="userHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="pass">Correo</label>
            <input type="text" class="form-control" id="pass" aria-describedby="passHelp" placeholder="Ingrese Correo">
            <small id="passHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>
      </div>
      <div class="row>
        <div class="col-md-3 offset-md-9c">
          <div class="form-group pull-right">
            <button class="btn btn-primary"> 
              <i class="fa fa-search btn-icon" aria-hidden="true"></i>
              Buscar Usuarios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`);

export default UserSystemListTemplate;
