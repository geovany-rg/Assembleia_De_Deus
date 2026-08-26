// =========================================================
// ASSEMBLEIA DE DEUS — REGIONAL ESMERALDAS
// JAVASCRIPT PRINCIPAL
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    const bibleModal = document.getElementById("bibleModal");
    const openBibleAI = document.getElementById("openBibleAI");
    const closeBibleAI = document.getElementById("closeBibleAI");
    const bibleModalOverlay = document.querySelector(".bible-modal-overlay");

    const currentYear = document.getElementById("currentYear");


    // =====================================================
    // ANO AUTOMÁTICO NO RODAPÉ
    // =====================================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================================
    // MENU MOBILE
    // =====================================================

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("active");

            const isOpen = nav.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuButton.textContent = isOpen
                ? "×"
                : "☰";

        });


        // Fecha o menu quando clicar em um link

        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // =====================================================
    // FECHAR MENU AO REDIMENSIONAR
    // =====================================================

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 800 &&
            nav
        ) {

            nav.classList.remove("active");

            if (menuButton) {

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    // =====================================================
    // MODAL DA IA BÍBLICA
    // =====================================================

    function openBibleModal() {

        if (!bibleModal) return;

        bibleModal.classList.add("active");

        bibleModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeBibleModal() {

        if (!bibleModal) return;

        bibleModal.classList.remove("active");

        bibleModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (openBibleAI) {

        openBibleAI.addEventListener(
            "click",
            openBibleModal
        );

    }


    if (closeBibleAI) {

        closeBibleAI.addEventListener(
            "click",
            closeBibleModal
        );

    }


    if (bibleModalOverlay) {

        bibleModalOverlay.addEventListener(
            "click",
            closeBibleModal
        );

    }


    // =====================================================
    // ESC FECHA A IA
    // =====================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                bibleModal &&
                bibleModal.classList.contains("active")
            ) {

                closeBibleModal();

            }

        }
    );


    // =====================================================
    // BOTÕES DE SUGESTÕES DA IA
    // =====================================================

    const aiSuggestions =
        document.querySelectorAll(
            ".ai-suggestions button"
        );


    aiSuggestions.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                /*
                    FUTURO:

                    Aqui vamos enviar a pergunta
                    para a IA bíblica.

                    Exemplo:

                    perguntarParaIA(
                        button.textContent
                    );

                    Por enquanto mostramos
                    uma mensagem simples.
                */

                const question =
                    button.textContent.trim();

                alert(
                    "Em breve você poderá perguntar:\n\n" +
                    question
                );

            }
        );

    });


    // =====================================================
    // ANIMAÇÕES AO ENTRAR NA TELA
    // =====================================================

    const animatedElements =
        document.querySelectorAll(
            ".service-card, " +
            ".department-card, " +
            ".contact-card, " +
            ".instagram-placeholder, " +
            ".events-empty, " +
            ".bible-ai-container"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            element.classList.add(
                "scroll-animation"
            );

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    // =====================================================
    // LINK SUAVE PARA ÂNCORAS
    // =====================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".header"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    // =====================================================
    // HEADER AO ROLAR
    // =====================================================

    const header =
        document.querySelector(".header");


    if (header) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 40) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            },
            {
                passive: true
            }
        );

    }


    // =====================================================
    // PROTEÇÃO CONTRA IMAGENS QUE NÃO CARREGARAM
    // =====================================================

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                /*
                    Não substituímos automaticamente
                    por imagem da internet.

                    Assim evitamos que o site dependa
                    de imagens externas.
                */

            }
        );

    });


    // =====================================================
    // CONSOLE — IDENTIFICAÇÃO DO SITE
    // =====================================================

    console.log(
        "%c Assembleia de Deus — Regional Esmeraldas ",
        "background:#202020;color:#d6ad65;font-size:14px;padding:8px;"
    );

    console.log(
        "Site carregado com sucesso."
    );

});
