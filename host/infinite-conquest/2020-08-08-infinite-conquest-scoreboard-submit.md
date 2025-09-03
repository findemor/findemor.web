---
title: Infinite Conquest / Submit score
tags: [PLAYDATE]
style: border
color: danger
description: Registra la puntuación de tu reino de Infinite Conquest.
---

> Register your kingdgom in the hall of glory!

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="/assets/images/uploads/infinite_conquest/infinite-conquest-sdk-submit.js"></script>

<form class="needs-validation">
  <div class="form-group">
    <label for="nick">King name</label>
    <input type="text" class="form-control" id="nick" aria-describedby="nick" placeholder="King name" required maxlength="16">
    <small id="nickHelp" class="form-text text-muted">This name will be displayed publicly along with your score.</small>
    <div class="invalid-feedback">
        Please choose your name.
    </div>
    <div class="valid-feedback">
        Long and prosperous life!
    </div>
  </div>
  <div class="form-group">
    <label for="twitter">Twitter user</label>
    <input type="text" class="form-control" id="twitter" placeholder="username">
    <small id="twitterHelp" class="form-text text-muted">(Optional) Your King name will become a link to your twitter timeline.</small>
  </div>
  <button id="submit" type="submit" class="btn btn-primary">Submit your score</button>
  
</form>
<div id="displayError" class="invalid-feedback" style="display: none;">
  This page appears to not be correctly generated. This form is only valid if you have been redirected from the Playdate game. If you did but still not working, please  <a href="https://github.com/findemor/games.feedback/issues" target="_blank">open a new issue</a>.
</div>
