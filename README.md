# Fitoclone (I will think of a better title at a later date!!)

A simple CRUD style workout tracker. Currently a work in progress.

## Built With

React/create-react-app

### Motivation

Fitocracy is a website for tracking workouts that uses mechanics from both role-playing video games (obtaining points, levelling up, performing quests, obtaining achievements), and social media sites (status updates, liking/commenting on other people's workouts/posts, joining groups). I have been using the website for a number of years, but over time I have become less and less interested in both the gamification and social aspects of it, and have instead been using it as a straight workout tracker. Unfortunately I feel there are a couple of areas where it falls short in this:

1. It is quite time-consuming to retrieve old workout data. The site loads your 15 most recent workouts and then when you scroll to the bottom of your feed it loads the next 15 most recent with an AJAX call. I've been using the site for about 7.5 years and at the time of writing have over 1200 workouts, meaning that to view the workouts at the very beginning I have to scroll down on my feed 80+ times.
2. Fitocracy shows you PRs but it's very basic, it only flags weight-lifting exercises with the highest weight or the furthest distance for cardio exercises. I would like to expand this to show multiple PRs for different reps, and maybe have cardio PRs be speed based over different distances. 
3. It would be useful to have the ability to make custom workout routines to make tracking workouts quicker. Fitocracy does provide this but it's a premium-only feature. 

Furthermore since the site was sold a few years ago, it seems development/maintenance on it is minimal (e.g. the Android app has been deleted from the Google Play store), leading me to believe it won't be around forever.

My intention is to create a simple CRUD app that will serve as a future-proof replacement to Fitocracy for tracking my own workouts, removing the features I don't use and adding features I would find useful.