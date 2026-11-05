// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")



function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)

gsap.to(".reveal-hero-text", {
    opacity: 0,
    y: "100%",
})

gsap.to(".reveal-hero-img", {
    opacity: 0,
    y: "100%",
})

gsap.to("#hero-img-bg", {
    scale: 0
})

gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%",
})


window.addEventListener("load", () => {
    // animate from initial position
    gsap.to(".reveal-hero-text", {
        opacity: 1,
        y: "0%",
        duration: 0.8,
        // ease: "power3.out",
        stagger: 0.5, // Delay between each word's reveal,
        // delay: 3
    })

    gsap.to(".reveal-hero-img", {
        opacity: 1,
        y: "0%",
    })

    gsap.to("#hero-img-bg", {
        scale: 1,
        duration: 0.8,
        delay: 0.4
    })

})

const NEWSLETTER_API_ENDPOINT = "http://localhost:8000/api/v1/email"
const newsletterDialog = document.getElementById("newsletter-dialog")
const newsletterForm = document.getElementById("newsletter-form")
const newsletterEmail = document.getElementById("newsletter-email")
const newsletterConsent = document.getElementById("newsletter-consent")
const newsletterSubmit = document.getElementById("newsletter-submit")
const newsletterStatus = document.getElementById("newsletter-status")



function openNewsletterDialog() {
    if (!newsletterDialog.open) {
        newsletterDialog.showModal()
    }
    newsletterEmail.focus()
}

document.querySelectorAll("[data-open-newsletter]").forEach((button) => {
    button.addEventListener("click", openNewsletterDialog)
})

document.getElementById("newsletter-close").addEventListener("click", () => {
    newsletterDialog.close()

})

window.addEventListener("load", () => {
    setTimeout(() => {
        openNewsletterDialog()
    }, 3000)
})


newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    newsletterStatus.textContent = ""
    newsletterStatus.removeAttribute("data-state")
    newsletterSubmit.disabled = true
    newsletterSubmit.textContent = "Subscribing..."

    try {
        const email = newsletterEmail.value.trim()
        const name = email.split("@")[0]

        const response = await fetch(NEWSLETTER_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                name,
            }),
        })

        if (!response.ok) {
            throw new Error(`Newsletter signup failed (${response.status}).`)
        }

        newsletterStatus.textContent = "Thanks for subscribing!"
        newsletterForm.reset()
        newsletterDialog.close()

    } catch (error) {
        console.error("Newsletter signup failed:", error)

        newsletterStatus.dataset.state = "error"
        newsletterStatus.textContent =
            "We couldn't subscribe you right now. Please try again."

    } finally {
        newsletterSubmit.disabled = false
        newsletterSubmit.textContent = "Subscribe"
    }
})


// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
            trigger: sec,
            start: "10% 80%", // top of trigger hits the top of viewport
            end: "20% 90%",
            // markers: true,
            // scrub: 1,
        }
    })

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })


})


