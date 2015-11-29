{% extends '../layouts/mainTerminalLayout.swig' %}


    {% block head %}{% endblock %}



{% block top %}
    <h1>Добро пожаловать в Терминал</h1>
    <h1>{{ foo.bar }}</h1>
{% endblock %}


{% block body %}
    <h2>Что то в терминале</h2>
{% endblock %}


{% block footer %}
    <a href="/"> На главную</a>
    <a href="/blog">Блог</a>
{% endblock %}

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
                    /*alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                    alert(response.status); // 200*/
                }) .catch( alert );
    });
</script>