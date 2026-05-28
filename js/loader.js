// js/loader.js

async function loadComponents() {
    // 1. Define the sections to load
    const components = [
        { id: 'nav-placeholder', path: 'sections/nav.html' },
        { id: 'about-placeholder', path: 'sections/about.html' },
        { id: 'demos-placeholder', path: 'sections/demos.html' },
        { id: 'experience-placeholder', path: 'sections/experience.html' },
        { id: 'education-placeholder', path: 'sections/education.html' },
        { id: 'skills-placeholder', path: 'sections/skills.html' },
        { id: 'interests-placeholder', path: 'sections/interests.html' },
        { id: 'achievements-placeholder', path: 'sections/achievements.html' },
        { id: 'notes-placeholder', path: 'sections/notes.html' }
    ];

    // 2. Fetch all HTML files concurrently
    const loadPromises = components.map(async (component) => {
        try {
            const response = await fetch(component.path);
            if (!response.ok) throw new Error(`Failed to load ${component.path}`);
            const html = await response.text();
            document.getElementById(component.id).innerHTML = html;
        } catch (error) {
            console.error(error);
        }
    });

    // 3. Wait for all sections to be injected into the page
    await Promise.all(loadPromises);

    // 4. Inject the original theme script ONLY AFTER the HTML is loaded
    // This ensures Bootstrap's ScrollSpy and navigation clicks work properly
    const script = document.createElement('script');
    script.src = 'js/scripts.js';
    document.body.appendChild(script);
}

// Run the function when the page initializes
document.addEventListener("DOMContentLoaded", loadComponents);