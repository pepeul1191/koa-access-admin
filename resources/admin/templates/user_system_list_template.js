import _ from 'underscore';

var UserSystemListTemplate = _.template(`
  <h2 class="page-tittle">Gestión de Sistemas del Usuario</h2>
  <br>
  <div class="row">
    <div class="col-md-12">
      <label id="message"></label>
    </div>
    <div class="col-md-6">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sistema</th>
            <th scope="col" class="text-center">Asociado</th>
            <th scope="col" class="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          <% for (var i = 0; i < systems.length; i++){ %>
          <tr>
            <td><%= systems[i].name %></td>
            <td class="text-center">
              <% if (systems[i].exist) { %>
                <input type="checkbox" class="form-check-input text-center system-check" system_id="<%= systems[i].system_id %>" checked>
              <% } else { %>
                <input type="checkbox" class="form-check-input text-center system-check" system_id="<%= systems[i].system_id %>">
              <% } %>
            </td>
            <td class="text-center">
              <a href="<%= base_url %>#/user/<%= user_id %>/system_id/<%= systems[i].system_id %>">
                <i class="fa fa-list row-icon" aria-hidden="true"></i>
              </a>
            </td>
          </tr>
          <% } %>
        </tbody>
      </table>
    </div>
  </div>
`);

export default UserSystemListTemplate;
