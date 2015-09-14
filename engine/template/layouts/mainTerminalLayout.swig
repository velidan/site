<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Административный терминал</title>
    <link href="/css/terminal.css" rel="stylesheet" type="text/css">
    {% block head %}{% endblock %}
</head>

<body>

{% block top %}{% endblock %}
{% block body %}{% endblock %}
{% block footer %}{% endblock %}

<script src="/js/fetch.js" type="text/javascript"></script>


{% block scripts %}{% endblock %}
</body>
</html>