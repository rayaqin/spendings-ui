# Interview coding challenge

This repo has been created as part of an interview process to fulfill the requirements listed [HERE](https://github.com/polygence/spending-frontend?tab=readme-ov-file).

-   [Polygence coding challenge](#polygence-coding-challenge)
    -   [Quick Setup](#quick-setup)
    -   [Tech stack related notes](#tech-stack-related-notes)
    -   [Why I did not use Redux](#why-i-did-not-use-redux)
    -   [The Edit and Delete buttons](#the-edit-and-delete-buttons)
    -   [Git commits](#git-commits)
    -   [Extra bits](#extra-bits)
    -   [Potential sass failed to load issue](#potential-sass-failed-to-load-issue)

## Quick Setup

To run the app locally after cloning:

```
npm i
```

```
npm run dev
```

To run a few tests:

```
npm run test
```

## Tech stack related notes

Alongside **React and Typescript** which are my usual preferred choices for web applications, I decided to try **Vite** as the module bundler, since it is apparently a popular choice nowadays.

I also opted to try the **ReactQuery** library, as I've seen it being recommended by people in the React community.

## Why I did not use Redux

I've found that React Query doesn't really work smoothly with Redux if I want to display a fetched list from a store value, since React Query would ideally make me use isLoding and isError to decide whether I can display the values, while if I have to wait for redux to update the store as well, this doesn't work very well. There might be a smooth solution to making useQuery work with Redux without causing a jittery UI, but it seems to me that it is probably not worth the effort to figure it out.
Also I've listened to podcasts with Dan Abramov, and even he, a co-creator of redux, doesn't recommend using redux for most everyday usecases.

## The Edit and Delete buttons

Since the acceptance criteria doesn't mention the edit and delete buttons, and the backend didn't allow for UPDATE and DELETE requests, plus on the provided image the buttons look disabled, I decided to just disable the buttons. Under normal circumstances when I'm uncertain what the scope of the task is exactly, I would ask, but I thought in this case I am supposed to make some assumptions, and submit an acceptable solution, instead of asking about every small thing.

## Git commits

It only occured to me towards the very end of development that you might actually be interested in what the commits look like, in terms of commit message, size, and changes being grouped together, but it was too late to do that properly by that point. I am aware of the [best practices](https://www.conventionalcommits.org/en/v1.0.0/#summary) related to collaboration on git though, even if this repo won't testify for it.

## Extra bits

-   The backend sorts the data by amount based on the flat values, and doesn't take the currency into account when we select the ALL option. This might be the intended feature, but just in case I added a **client side sorting option** that uses a currency exchange rate API.
-   **Sorting and filtering** settings are saved into **cookies**.
-   I had noticed that the backend does **not allow for descriptions longer than 200 characters**, so I've restricted the input and added a nice toast warning message.
-   Handled the special case when the description is as long as it can be, and has no white spaces.
-   Tried to make the app responsive **with minimal of media queries** as a challenge _(smallest screen I tested with is iPhone SE)_, since I've recently heard from Kevin Powell _(a prominent figure in CSS circles)_ that we should avoid unnecessary media queries if there is a better way. In the end I had to use some though to decrease the sizes here and there because of edge case values of description and amount.
-   Used a **different icon for HUF and USD**.
-   Added a cute **loading animation to the Save button**, and an **error state + an error toast message**, to make it a bit nicer.
-   Ended up with a custom implementation of **skeletons for the SpendingsList**, because the React Loading Skeleton library just didn't work properly for me, and refused to play animations the right way.
-   Although technically it wasn't strictly necessary, I **filtered the backend response**, to make sure the array items are the right type before trying to display them.
-   Added some **cute hover effects**, and a favicon.
-   Added a **k/m/b converter that abbreviates numbers larger than 1_000_000** to better handle cases when the numbers are huge and the screen is small.

## Potential sass failed to load issue

The newest node version causes an error with loading sass. If you encounter this error, downgrade to 20.10.0 or lower.
https://github.com/vercel/next.js/issues/57005
