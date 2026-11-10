# Jollytails Resort hosting and domain launch reference

Updated November 10, 2026. The public website currently runs on Squarespace. The replacement website is online on Vercel. Launch will connect the existing Resort domain to Vercel while keeping the domain, DNS management, and Microsoft 365 email with GoDaddy.

## Services and locations

| Service | Provider and location | Launch treatment |
| --- | --- | --- |
| Current public website | Squarespace at [www.jollytailsresort.ca](https://www.jollytailsresort.ca/) | Keep active during the switch; cancel its website subscription after the Vercel launch is verified. |
| Domain registration | GoDaddy, `jollytailsresort.ca` | Keep the registration and renewal active. No registrar transfer is needed for this launch. |
| DNS management | GoDaddy; nameservers `ns63.domaincontrol.com` and `ns64.domaincontrol.com` | Keep these nameservers. Change the website records to the values supplied by the Resort Vercel project. |
| Replacement website | Vercel at [jollytails-resort.vercel.app](https://jollytails-resort.vercel.app/) | Connect both `jollytailsresort.ca` and `www.jollytailsresort.ca` to the Resort project. |
| Website source | [gogopammy/jollytails-resort](https://github.com/gogopammy/jollytails-resort), branch `main` | Repository is already public, verified November 10, 2026. Use the existing GitHub-to-Vercel deployment arrangement. |
| Resort email | Microsoft 365/Outlook through GoDaddy | Keep subscriptions and email DNS records unchanged. Email is separate from Squarespace website hosting. |

Pamela retains administrative control of the domain, DNS, Vercel, billing, and deployment settings. Kevin's editing access is through this GitHub repository; he does not need access to Pamela's Vercel account. See [Kevin's editor setup](KEVIN-WEBSITE-EDITOR-SETUP.md).

## Where to manage services

- [GoDaddy My Products](https://account.godaddy.com/products): Resort domain, DNS, and Microsoft 365 subscriptions.
- [Squarespace website subscription](https://jollytails-resort.squarespace.com/config/settings/billing/subscriptions/website): existing website plan and renewal details.
- [Vercel dashboard](https://vercel.com/dashboard): open the Resort project, then Settings > Domains for the exact connection records.

The September 28 setup record confirms that a change to Squarespace Basic monthly billing was scheduled for October 10, 2026. Check the current subscription and next renewal date in Squarespace before cancellation; that billing screen has not been rechecked for this reference.

## Current public DNS records

Observed November 10, 2026. These are the existing records, not the new Vercel settings.

| Record | Current value |
| --- | --- |
| Root domain A records | `198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145` |
| `www` CNAME | `ext-cust.squarespace.com` |
| Email MX | Priority `0`, `jollytailsresort-ca.mail.protection.outlook.com` |

Save a complete DNS export immediately before launch. This short snapshot does not include all TXT, verification, email authentication, or other records.

## Domain switch at the approved launch

1. In the Resort Vercel project, confirm the production deployment comes from this repository's `main` branch. Add or inspect both domain names. Use the exact DNS values Vercel displays at that time; the required project-specific values have not yet been recorded here.
2. In GoDaddy, update only the website records needed for Vercel, plus any ownership-verification record Vercel requests. Preserve the nameservers and all email records, including MX, SPF, DKIM, DMARC, and autodiscover. Vercel documents the domain connection process in its [custom domain guide](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
3. Configure one primary address and redirect the other to it. The current website source uses `https://jollytailsresort.ca` in canonical URLs, so the root domain is the natural primary address unless Pamela chooses otherwise.
4. Verify both addresses reach the new site over HTTPS, Vercel reports valid domain configuration, and Resort email still sends and receives. Keep Squarespace active until the switch is stable. If rollback is needed, restore the saved website DNS records while Squarespace remains active.
5. After verification, cancel only the Squarespace website subscription before its next renewal. Continue the GoDaddy domain and Microsoft 365 subscriptions. No GoDaddy web-hosting purchase is needed for the Vercel site.

## Search visibility at launch

The Vercel site currently returns `X-Robots-Tag: noindex, nofollow, noarchive`. The repository also blocks indexing in `robots.txt` and page metadata. At the approved launch, update these production settings together with the page generator and validator so future edits do not restore the development blocks. This is a deployment setting; the website content review is complete.

## Verification record

The November 10 public DNS and HTTP checks confirmed Squarespace for the current domain, Vercel for the replacement address, and Microsoft 365 mail routing. GitHub confirmed the repository is public. Domain ownership and service responsibilities follow the project guidance; the monthly Squarespace arrangement comes from the September 28 setup record. No domain, hosting, subscription, or email settings were changed while preparing this reference.
