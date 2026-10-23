# Project guidance

## Resort editor and deployment model

- Pamela owns the `gogopammy/jollytails-resort` GitHub repository and the Jollytails Resort Vercel project.
- Before launch, change the GitHub repository from private to public only after a final audit for secrets and private material, and after removing obsolete build and review notes.
- Kevin at Jollytails Resort will use his own personal GitHub account and will be added as a collaborator only to `gogopammy/jollytails-resort`.
- Do not give Kevin access to Pamela's Vercel account or to any other Vercel projects.
- Kevin will use GitHub Desktop to clone the Resort repository to his computer, then open that local repository in Codex.
- Kevin may edit the website in Codex, commit changes directly to `main`, and push them to GitHub.
- Once the repository is public, Vercel should automatically deploy Kevin's commits without requiring him to be a Vercel team member.
- This workflow was tested successfully with the Bare Bones Pressure Wash website: a collaborator's commit did not deploy while the repository was private, but it deployed after that same repository was made public, without granting the collaborator Vercel access.
- Pamela retains ownership and administrative control of GitHub, Vercel, the domain and DNS, billing, and deployment configuration.

## Repository safety

- Never add credentials, passwords, private customer or staff data, API secrets, `.env` secrets, or any other sensitive information to this repository.
- Normal public website content, HTML, CSS, JavaScript, public images, and non-sensitive configuration may remain in the repository.

