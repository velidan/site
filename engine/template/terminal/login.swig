{% extends '../layouts/mainTerminalLayout.swig' %}


    {% block head %}{% endblock %}



{% block top %}
    <h1>Необходима идентификация</h1>
    <h1>{{ foo.bar }}</h1>
{% endblock %}


{% block body %}
    <form id="loginForm" method="post" enctype="multipart/form-data">
        <label>Логин
            <input type="text" name="login" placeholder="Login">
        </label>
        <label>Пароль
            <input type="password" name="password" placeholder="Password">
        </label>
        <button>Идентификация</button>
    </form>
{% endblock %}


{% block footer %}
    <a href="/"> На главную</a>
    <a href="/blog">Блог</a>
{% endblock %}


{% block scripts %}
    <script type="text/javascript">
        var form = document.getElementById('loginForm');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.preventDefault();

            var formData = new FormData(this);

            var processStatus = function (response) {
                // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject(new Error(response.statusText))
                }
            };

            fetch('/terminal', {method : 'post',
                body : formData})
                    .then(function(response) {
                       /* alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                        alert(response.status); // 200*/
                    }) .catch( alert );
        });
    </script>
{% endblock %}