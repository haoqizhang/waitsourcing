Waitsourcing: Aproaches to low-effort crowdsourcing
=====================================================

Crowdsourcing is often approached as a full-attention activity. In our study, we considered the potential of thinking of crowdsourcing as a /low-effort/, /low-bandwidth/ activity. What types of interaction possibilities are made possible when considering tasks in this way, and what possibilities open up with low-effort crowdsourcing? We offer four eclectic mockups of such tasks.

TODO: sentence expanding on the problem
To stimulate thinking about low-effort crowdsourcing, we considered the case of waiting. 

TODO: some initial conceptualization of low-effort crowdsourcing

Tasks
------

### Task 1: Browser waiting

In our first exploration of low-effort crowdsourcing, we prototyped a browser extension that allows you to complete tasks while waiting for a page to load.

[task 1 image]

We found that implementing tasks in the browser is certainly feasible. When the content is stored locally, it is possible to complete small low-effort tasks within the time that it takes to load a slower the page. The question remains how this can be realized in practice, however. What types of tasks would be useful to complete?

A benefit of sneaking tasks into a browser load wait is that the user is already disrupted from their flow. However, a notable concern is that users may not shift back into their browsing mode, and keep completing tasks after their page has loaded. While some task creators might consider this a benefit, it violates the low-effort unobtrusive goals of the tool. One technically feasible solution is to forcibly close the panel when the primary task, in this case the web page being waited on, is ready. 


### Task 2: Emotive voting

How passive can a crowdsourcing contribution be? Many sites implement low-effect ways to respond to the quality of a online content, such as a star, a 'Like', or a thumbs up. These features collect a very small contribution, but in doing so, require barely any thought from the submitter and result in valuable judgments on an item.

Our next prototype takes this form of quality judgment one step further: to no-effort feedback. Using a camera and facial recognition, we observe a user's face as they view a slideshow of images claimed to be humorous. When a user smiles, we take it as a vote for the image that they're viewing.

[task 2 image]

There are some social and technical challenges to a system that uses facial recognition as an input. Even if the act of contributing itself isn't intrusive, having a camera watching you can feel intrusive. Even with assurances that nothing from the camera feed is being saved, it is highly unlikely that most people would feel comfortable with this form of input. Additionally, there are challenges related to the fact that web browsing is not very emotive and many people do no express their amusement outwardly.

### Task 3: Secret-agent feedback

[task 3 image]

### Task 4: Choose-Your-Own-Adventure writing

Our final mockup wonders where a [URL?]

[task 4 image]


Conclusion
-----------
....


Authors
--------
- Jeff Bigham
- Kotaro Hara
- Peter Organisciak
- Rajan Vaish
- Haoqi Zhang
