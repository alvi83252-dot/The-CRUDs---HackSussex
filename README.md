# Overview

Binbuddy is a mobile-first web application that helps people find nearby bins, understand what type of waste each bin accepts, and contribute to cleaner, more sustainable communities through community reporting and AI-assisted validation.
The platform combines live map-based discovery, user-submitted bin reports, image-based verification, and gamified participation to make waste disposal easier for the public while also generating higher-quality data that could support local authorities and other stakeholders involved in waste management.
Our goal is not only to help users locate bins more easily, but also to improve the quality, accuracy, and usefulness of public waste infrastructure data in a way that is practical within a hackathon prototype.
________________________________________

# The Problem

A common issue in many towns and cities is that people often do not know:
•	where the nearest bin is
•	what type of waste that bin accepts
•	whether there are nearby recycling or specialist disposal points
•	whether waste infrastructure data is accurate, complete, or up to date
This creates friction for everyday recycling and waste disposal. It also limits the ability of communities and authorities to identify infrastructure gaps, improve public cleanliness, and respond to changing needs.
BinBuddy addresses this by creating a simple system where users can:
•	discover bins on a map
•	view useful information about each bin
•	submit photo-backed reports
•	help improve public data quality through AI-supported validation
________________________________________

# Our Solution

BinFinder provides a map-based interface where users can explore nearby bins and related waste points. Each mapped bin can include:
•	postcode
•	coordinates
•	bin type (for example recyclable, general waste, etc.)
•	uploaded images
•	estimated fill or capacity percentage
•	distance from the user’s current location
The platform also supports additional map layers and related waste-management points, such as:
•	recycling facilities
•	landfills
•	incinerators
•	other relevant waste-management locations
Users can report new bins or submit information updates. To improve integrity and reduce spam or misleading submissions, reports go through an AI-assisted validation flow before being treated as trusted contributions.
________________________________________

# Why We Built It

We wanted to build something that solves a real-world environmental problem in a way that is both practical and scalable.
Rather than treating waste disposal as only a logistics issue, we approached it as a data, accessibility, and participation problem. If people can easily find the right bin, understand where waste should go, and contribute to keeping information up to date, cities become easier to keep clean and communities become more engaged in sustainable behaviour.
At the same time, a platform like this can help move waste reporting from fragmented and informal public feedback into a more structured, visual, and actionable stream of information that could be useful for local councils and other local authorities.
________________________________________

# Key Features

1. Interactive map of nearby bins
Users can view nearby bins on a live, mobile-friendly map. This makes the experience quick, intuitive, and suitable for on-the-go use.
2. Detailed bin information
Clicking a bin reveals useful information such as:
•	postcode
•	photos
•	bin type
•	coordinates
•	estimated current fill/capacity level
•	distance from the user
3. Live photo submission
When submitting a report, users must take a real-time photo through the app instead of uploading an existing image from their gallery.
This is designed to improve trust in submissions and reduce the likelihood of false, outdated, or misleading uploads.
4. Gemini AI validation

Gemini is used to analyse submitted images and determine whether:

•	the image contains a real bin
•	the image is relevant to the report
•	the submission appears fake, misleading, or AI-generated
A report is only treated as valid if it passes the required validation checks.
5. Estimated fill-level analysis
The system uses AI reasoning to estimate how full a bin appears to be based on the submitted image.
6. Gamification to encourage participation, users can earn:
•	XP points
•	bronze, silver, and gold leagues
•	conceptual rewards such as vouchers or tickets
7. Integrity and moderation checks to reduce misuse, the platform can include:
•	duplicate submission prevention
•	image verification
•	location matching between user and report
•	admin approval before rewards are issued
8. Guest and authenticated flows some parts of the platform remain open for browsing, while reporting and progression features are reserved for authenticated users.
________________________________________

# How It Works

The intended user flow is:
1.	A user opens the app on their phone.
2.	They allow location access.
3.	The map displays nearby bins and related waste points.
4.	They tap a marker to view details.
5.	If they want to contribute, they submit a photo-based report.
6.	The backend checks the report, including location and duplication logic.
7.	Gemini analyses the image to determine whether it appears to contain a real bin and to estimate fill level.
8.	Valid reports can then contribute to platform data quality and reward progression.
This creates a loop where the public both uses and improves the system.
________________________________________

# Why We Used Gemini

We used Gemini because the project depends on understanding submitted images, not just storing them.
Google’s Gemini API is designed for multimodal input, including image understanding, and supports tasks such as image classification and visual reasoning without necessarily requiring a separate specialised computer vision pipeline. That makes it a strong fit for a hackathon prototype where we needed an AI layer that could quickly support practical validation tasks.
For BinBuddy, Gemini is especially useful because it helps us answer questions such as:
•	Does this image actually contain a bin?
•	Does the image look relevant to the submitted report?
•	Can we estimate an approximate fill level from what is visible?
This matters because open community reporting systems are vulnerable to poor-quality submissions, fake images, or accidental misuse. Gemini gives the project a way to add an intelligent validation layer, improving trust in the data and making reports more useful.
Gemini is therefore part of the core product logic rather than a cosmetic add-on. It helps with:
•	validating community submissions
•	improving data quality
•	supporting moderation
•	turning raw photo uploads into more meaningful environmental information
________________________________________

# Why We Used Auth0

We used Auth0 because BinBuddy needs a secure and scalable way to separate casual browsing from trusted contribution.
Auth0 supports authentication and authorisation using OpenID Connect (OIDC) and OAuth 2.0, and it issues tokens such as JWTs that can be used to protect backend routes and APIs. This is useful for a platform like ours, where users may be allowed to browse publicly but must be authenticated before submitting reports, earning XP, or accessing account-linked features.
Auth0 is a strong fit for this project because it helps us:
•	verify user identity securely
•	associate reports with individual users
•	prevent anonymous abuse of contribution features
•	protect reward and gamification systems from manipulation
•	secure protected backend actions and moderation flows
In other words, Auth0 is not only there for login. It supports the trust model of the platform. Since BinBuddy relies on user-generated environmental data, secure identity and protected API access are important to keeping the system reliable.
________________________________________

# Why It Fits the CXI+AI Track

BinBuddy aligns well with the CXI+AI / design-to-delivery accelerator idea because the project combines user experience, AI decision support, and clear delivery of outcomes.
From the user side, the experience is simple:
•	open the app
•	find a nearby bin
•	understand what it is for
•	contribute a report in a guided way
From the system side, the project turns that interaction into a more complete delivery pipeline:
•	collect structured location and image data
•	validate it with AI
•	improve trust in the submission
•	surface information that could support operational follow-up
That means BinBuddy is more than a bin-discovery interface. It is an AI-enhanced service flow that translates public interaction into more useful, more actionable environmental data.
________________________________________

# Local Authority and Public Value

A key part of BinBuddy is that it is useful not only for individuals, but also for local authorities and councils.
Local authorities are responsible for many public waste-management decisions, but they often face challenges around:
•	incomplete on-the-ground data
•	inconsistent public reporting
•	difficulty spotting infrastructure gaps
•	limited insight into how bins are being used. BinBuddy can help by creating a more structured reporting stream. Over time, a platform like this could support authorities by:
•	identifying areas with poor bin coverage
•	highlighting demand for recycling points
•	spotting recurring reports about full or poorly located bins
•	improving visibility into public waste behaviour
•	supporting cleaner and more evidence-based urban planning decisions
This means the project serves two audiences at once:
•	the public, who need an easier way to find and use bins
•	local authorities, who benefit from better waste infrastructure insight
________________________________________

# Environmental Impact

BinBuddy supports better environmental behaviour by reducing friction around proper waste disposal.
If people can quickly find an appropriate bin, understand bin types, and locate related waste points, they are more likely to dispose of waste correctly rather than delay disposal, contaminate recycling, or litter. In that sense, BinBuddy supports both behaviour change and better infrastructure visibility.
The app also encourages communities to contribute useful environmental information rather than relying only on static or incomplete datasets. This makes the platform not just informative, but participatory.
________________________________________

# Connection to the UN Sustainable Development Goals

BinBuddy is strongly connected to several UN Sustainable Development Goals because it helps improve how people interact with waste infrastructure in everyday life. By making bins and recycling points easier to find and understand, the project supports more sustainable urban living and encourages cleaner, more efficient use of public spaces. It also helps promote more responsible consumption and disposal habits by making waste sorting and recycling infrastructure more accessible to the public. In addition, better waste disposal and improved reporting of waste infrastructure can help reduce littering, pollution, and environmental degradation in local areas, which gives the project a broader environmental value. A lighter connection can also be made to climate action, since better waste systems and more sustainable urban behaviour contribute to overall environmental resilience, although the strongest and most direct links are with sustainable cities, responsible consumption, and life on land.

________________________________________

# Tech Stack

•	Frontend: React that uses Typescript
•	Map: Leaflet or Mapbox
•	Authentication: Auth0
•	Backend: Node.js 
•	Database: MongoDB
•	AI Validation: Gemini API
•	Hosting: DigitalOcean
•	Data Source for Prototype: Demo/mock data and JSON-based bin data

________________________________________

# Data and Validation Logic

Because the platform includes community submissions, data quality is extremely important.
Our prototype design includes several integrity checks:
•	prevent duplicate reports from the same user for the same bin
•	compare user location with report location
•	validate that uploaded images appear relevant
•	require admin approval before higher-value rewards
•	keep browsing open while protecting contribution routes
This makes BinBuddy more than a simple crowdsource form. It becomes a more trustworthy contribution system.

________________________________________

# Gamification Strategy

One of our design goals was to encourage repeated, high-quality engagement.
To do this, BinBuddy introduces a lightweight gamification model:
•	users earn XP when valid reports are accepted
•	users move through bronze, silver, and gold leagues
•	higher trust and contribution levels can unlock conceptual rewards
This approach helps turn sustainability participation into something more engaging while still keeping validation and moderation in place to discourage abuse.

________________________________________

# Challenges

Some of the main challenges in building BinBuddy were:
•	designing something realistic within a 24-hour hackathon
•	balancing AI ambition with a deliverable prototype
•	preventing fake or duplicate submissions
•	making the reporting flow secure without damaging usability
•	combining map UX, AI validation, backend logic, and gamification into one coherent system
These challenges shaped our design decisions and pushed us to prioritise features that were both meaningful and feasible.
________________________________________

# What We’re Proud Of

We are especially proud that BinBuddy combines:
•	public usefulness
•	AI-assisted validation
•	secure contribution flows
•	environmental value
•	potential relevance to local authorities
Within a hackathon timeframe, we focused on building an idea that is both technically interesting and socially useful.
________________________________________

# Future Improvements

With more time, BinBuddy could be extended with:
•	real-time reporting dashboards for councils
•	stronger moderation tools
•	route planning to the nearest suitable bin
•	fuller recycling education by waste type
•	live bin status updates
•	trust scores for contributors
•	richer analytics for infrastructure planning
•	integration with local-authority waste datasets
________________________________________

# Hackathon Track Fit Summary

BinBuddy is especially relevant for the following tracks:
•	Best Use of Gemini API – because Gemini powers the project’s core image-validation and reasoning layer rather than being added only for presentation
•	Best Use of Auth0 – because secure identity, protected API access, and trusted user-linked reporting are central to the product’s contribution model
•	CXI+AI / Design to Delivery Accelerator – because the project combines thoughtful user experience with AI-assisted processing and a clear path from user action to delivered operational value
•	Environmental / impact-focused judging – because the project supports sustainable cities, responsible disposal, and better public participation in waste infrastructure
________________________________________

# Team

•	Maria Eduarda Mendes 
•	Laranaya Pandit
•	Faizan Alvi
•	Tahmid Sifa
