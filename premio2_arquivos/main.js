jQuery(function(){ 

    jQuery( '.guide__slider' ).each( function(){
        let slider = jQuery( this );

        let tns_slider = tns({
            container: slider[0],
            items: 1,
            slideBy: 'page',
            autoplay: false,
            mode: 'gallery',
            nav: false,
            loop: false,
            mouseDrag: true,
          });

    });


    jQuery( '.slider' ).each( function(){
        let parent = jQuery( this );
        let slider = parent.find( '.slider__content' );

        if( slider.find( '.banner' ).length > 1 ){

            parent.addClass( '-has-slider' );

            tns({
                container: slider[0],
                items: 1,
                slideBy: 'page',
                autoplay: true,
                nav: true,
                loop: true,
                mode: 'gallery',
                speed: '800',
                mouseDrag: true,
                autoHeight: true,
            });
        }

    });

    jQuery( '.page-nav--tab.-slider-on-mobile' ).each( function(){
        let parent = jQuery( this );
        let slider = parent.find( '.page-nav__content' );

        if( slider.find( '.page-nav__item' ).length > 1 && is_mobile() ){

            window.pagnavmenu = tns({
                container: slider[0],
                items: 1,
                slideBy: 'page',
                autoplay: false,
                nav: false,
                loop: false,
                mode: 'gallery',
                speed: '800',
                mouseDrag: true,
                autoHeight: true,
            });
        
            window.pagnavmenu.events.on( 'indexChanged' , function(){
                let target = jQuery( window.pagnavmenu.getInfo().container ).find( '.tns-slide-active' );
                
                if( !target.hasClass( '-is-active') ){
                    window.location.replace( target.find( '.page-nav__link' ).attr( 'href') );
                }
            })
        }
    });

    jQuery( '.eventslist__slider' ).each( function(){
        let slider = jQuery( this );

            window.eventlist = tns({
                container: slider[0],
                items: 1,
                edgePadding: 40,
                gutter: 10,
                slideBy: 'page',
                autoplay: false,
                nav: true,
                loop: false,
                mouseDrag: true,
                autoHeight: true,
                responsive: {
                    580: {
                        items: 2,
                        edgePadding: 0
                    },
                    960: {
                        items: 3,
                        edgePadding: 0
                    },
                }
            });

            let target = jQuery( window.eventlist.getInfo().container );

            target.find( '.tns-item' ).first().addClass( '-center-item' );

            window.eventlist.events.on( 'indexChanged' , function(){
                target.find( '.tns-item' ).removeClass( '-center-item' );
                jQuery( '#' + target.attr( 'id' ) + '-item' + window.eventlist.getInfo().index ).addClass( '-center-item' );
            })

    });

    jQuery( '.carousel' ).each( function(){
        let parent = jQuery( this );
        let slider = parent.find( '.carousel__showcase' );

        if( slider.find( '.carousel__item' ).length > 1 ){
            parent.addClass( '-has-slider' );

            tns({
                container: slider[0],
                items: 1,
                slideBy: 'page',
                autoplay: true,
                nav: true,
                loop: true,
                mode: 'gallery',
                speed: '1000',
                mouseDrag: true,
                autoHeight: true,
            });
        }

    });

    var profit_group = [];
    jQuery( '.profit__slider' ).each( function(){
        var slider = jQuery( this );
        var profit_slider = tns({
                container: slider[0],
                items: 1,
                edgePadding: 40,
                gutter: 10,
                autoplay: false,
                nav: true,
                navPosition: 'bottom',
                loop: false,
                center: true,
                mouseDrag: true,
                autoHeight: true,
                slideBy: '1',
                responsive: {
                    580: {
                        edgePadding: 0,
                        slideBy: 1,
                        viewportMax: 300
                    },
                }
        });

        profit_group.push( profit_slider );


    });

    if( profit_group.length > 0 ){

        profit_group.forEach( the_profit_slider => {
            let target = jQuery( the_profit_slider.getInfo().container );
            target.find( '.tns-item' ).first().addClass( '-center-item' );


            the_profit_slider.events.on( 'indexChanged' , function() {
                target.find( '.tns-item' ).removeClass( '-center-item' );
                jQuery( '#' + target.attr( 'id' ) + '-item' + the_profit_slider.getInfo().index ).addClass( '-center-item' );
            });

        });
    }


    jQuery( '.show-more' ).each( function(){
        let the_section = jQuery( this );

        the_section.find( '.show-more__link' ).on( 'click' , function(e){
            the_section.find( '.show-more__content' ).removeClass( '-is-hidden' );
            jQuery( this ).addClass( '-is-hidden' );
            e.preventDefault();
        });
    });


    jQuery( '.highlight' ).each( function(){

        jQuery( this ).find( '.highlight__tooltip' ).on( 'click' , function(e){
            e.stopPropagation();
            OpenHighlightModal( jQuery( this ) );
        })

        jQuery( this ).find( '.highlight__modal-close' ).on( 'click' , function(e){
            e.stopPropagation();
            CloseHighlightModal( jQuery( this ) );
        })

        jQuery( this ).find( '.highlight__map' ).on( 'click' , function( e ){
            e.stopPropagation();
            CloseHighlightModal( jQuery( this ).find( '.highlight__modal' ) );
        })

    });


    jQuery( '.details' ).each( function(){
        jQuery( this ).find( '.details__single' ).on( 'click' , function(){
            let target = jQuery( this );

            if( !target.hasClass( '-is-active' ) ){
                target.parent( '.details__body' ).addClass( '-is-active' );
                target.addClass( '-is-active' ).siblings().removeClass( '-is-active' );
            }else{
                target.parent( '.details__body' ).removeClass( '-is-active' );
                target.removeClass( '-is-active' );
            }
        })
    })

    jQuery( '.fieldgroup .fieldgroup__header' ).on( 'click' , function(e){
        let target = jQuery( this ).parents( '.fieldgroup' );
        target .toggleClass( '-is-visible' );
    })

    
    jQuery( '.filter' ).each( function(){
        let the_filter = jQuery( this ),
            the_overlay = jQuery( '.overlay' );

        the_filter.find( '.filter__open' ).on( 'click' , function(e){

            the_filter.find( '.filter__body' ).addClass( '-is-visible' );
            the_overlay.addClass( '-is-visible' );

            e.preventDefault();
        });

        the_filter.find( '.filter__close' ).on( 'click' , function(e){

            the_filter.find( '.filter__body' ).removeClass( '-is-visible' );
            the_overlay.removeClass( '-is-visible' );
            
            the_filter.parents( '.section' ).find( '.reative' ).fadeOut(500).fadeIn(500);

            e.preventDefault();
        });

        the_filter.find( '[type="submit"]' ).on( 'click' , function(e){
            the_filter.find( '.filter__close' ).click();
            e.preventDefault();
        });

    })

    jQuery( '.header__search-btn' ).on( 'click' , function(e){
        let body = jQuery( 'body' );

        if( body.hasClass( '-search-is-visible' ) ){
            body.removeClass( '-search-is-visible' );
        }else{
            body.addClass( '-search-is-visible' );
            jQuery( '#header-search' ).focus();
        }

        if( body.hasClass( '-menu-is-visible' ) ){
            body.removeClass( '-menu-is-visible' );
        }

        e.preventDefault();
    });

    jQuery( '.header__toggle' ).on( 'click' , function(e){
        let body = jQuery( 'body' );

        if( body.hasClass( '-menu-is-visible' ) ){
            body.removeClass( '-menu-is-visible' );
        }else{
            body.addClass( '-menu-is-visible' );
        }

        if( body.hasClass( '-search-is-visible' ) ){
            body.removeClass( '-search-is-visible' );
        }

        e.preventDefault();
    });

    jQuery( '.header .menu-item-has-children > a' ).on( 'click' , function(e){
        let clicked = jQuery( this );
        if( is_mobile() || is_tablet() ){
            clicked.parents( '.menu-item' ).toggleClass( '-is-active' ).siblings( '.-is-active' ).removeClass( '-is-active' );

            e.preventDefault();
        }
    });

    jQuery( '.header__language' ).each( function(){
        let the_menu =jQuery( this );
        
        the_menu.find( '.dropdown-lang .menu-item a' ).on( 'click' , function(e){
            let el = jQuery( this );

            if( el.parents( '.menu-item' ).hasClass( 'current-menu-item') ){
                e.preventDefault();
            }
        })
    });

    jQuery( '.banner__show-more' ).on( 'click' , function(){
        let next_section = jQuery( this ).parents( '.banner' ).next( 'section' )

        if( next_section.length > 0 ){

            jQuery([document.documentElement, document.body]).animate({
                scrollTop: next_section.offset().top
            }, 800);

        }
    });

    jQuery( '.escolha input[name="tipo"]' ).on( 'change', function(){
        var tipo = jQuery( this ).val();
        jQuery( '.fields-pet').removeClass('-is-visible');
        jQuery( '.fields-pet#'+tipo ).addClass( '-is-visible' );
    })

    // só pra modais
    jQuery( '.-has-modal' ).on( 'click' , function(e){
        var modal_id = jQuery( this ).data( 'modal' );
        var mask = jQuery( '#mask-'+ modal_id );
        var modal = jQuery( '#'+ modal_id );
        modal.find( '.modal__limit' ).fadeIn(200);

        if( mask.length ){
            //console.log( mask );
            if( !mask.hasClass( '-is-active' ) ){
                mask.addClass( '-is-active' );
            }
        }

        if( modal.length ){
            if( !modal.hasClass( '-is-active' ) ){
                modal.addClass( '-is-active' );
            }
        }

        e.preventDefault();
    } );

    jQuery( '.modal__close' ).on( 'click' , function(){
        var modal_id = jQuery( this ).data( 'modal' );
        var mask = jQuery( '#mask-'+ modal_id );
        var required = jQuery( '#obrigatorio-' + modal_id );
        var modal = jQuery( '#'+ modal_id );
        modal.find( '.modal__limit' ).fadeIn(200);
        modal.find( '.response-modal').addClass('-is-hidden');

        if( required.is(":checked") || required.length == 0 ){

            if( mask.length ){
                if( mask.hasClass( '-is-active' ) ){
                    mask.removeClass( '-is-active' );
                }
            }

            if( modal.length ){
                if( modal.hasClass( '-is-active' ) ){
                    modal.removeClass( '-is-active' );
                }
            }

        }else{
            required.parents( '.checkbox' ).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        }

        modal.find( '.wpcf7-response-output' ).fadeOut(200);

        return false;  
    } )

    jQuery( '.modal-aba' ).each( function(){
        jQuery( this ).on( 'click', function(){
            var modal_content = jQuery( this ).attr('href');

            jQuery( '.modal-navigate .modal-aba' ).removeClass('-is-current');
            jQuery( this ).addClass('-is-current');

            jQuery( '.modal-item' ).removeClass('-is-current');
            jQuery( '.modal-item-content' ).find( modal_content ).addClass('-is-current');
            
            return false;
        } );

        // jQuery( this ).on('classChange', function() {
        //     console.log( 'entrou' );
        // });
    } )


    if( is_mobile() ){
        jQuery( '.modal-navigate' ).each( function(){
            let modal_nav = jQuery( this ),
                slider_el = modal_nav;

            var slider = tns({
                container: slider_el[0],
                items: 1,
                slideBy: 'page',
                autoplay: false,
                nav: false,
                loop: false,
                controls: true,
                mode: 'gallery',
                speed: '800',
                autoHeight: true,
            });

            slider.events.on( 'indexChanged' , function(){
                modal_nav.find( '.tns-slide-active' ).click();
            });

            jQuery( this ).find( '.modal-navigate__prev' ).on( 'click' , function(){
                slider.goTo( 'prev' );
            });

            jQuery( this ).find( '.modal-navigate__next' ).on( 'click' , function(){
                slider.goTo( 'next' );
            });

        });

    }


    jQuery( '.wp-block-gallery' ).each( function(){
        var the_gallery = jQuery( this );

        var index = 0;
        the_gallery.find( '.blocks-gallery-item' ).each( function() {

            jQuery( this ).attr( 'data-index' , index );
            index++;
        })

        the_gallery.find( '[data-full-url]' ).parent( 'figure' ).on( 'click' , function(){
            var modal = jQuery( '.wp-gallery-modal' ),
                the_slider = modal.find( '.wp-gallery-modal__slider' ),
                slider_index = jQuery( this ).parents( '.blocks-gallery-item' ).data( 'index' );

            // limpando o carrossel
            the_slider.html( '' );

            // Injetando imagens do carrossel
            the_gallery.find( '.blocks-gallery-item img' ).each( function(){
                the_slider.append( `<figure><img src="${jQuery( this ).data( 'full-url' )}" data-id="${jQuery( this ).data( 'id' )}"  alt="${jQuery( this ).attr( 'alt' )}" /></figure>` )
            });


            if( !the_slider.hasClass( 'tns-slider' ) ){
                window.block_gallery = tns({
                    container: the_slider[0],
                    items: 1,
                    slideBy: 'page',
                    autoplay: false,
                    nav: false,
                    loop: true,
                    controls: true,
                    mode: 'gallery',
                    autoHeight: true,
                    mouseDrag: true,
                    startIndex: slider_index
                });
            }else{
                window.block_gallery.destroy();
                window.block_gallery.rebuild();
            };

            // window.block_gallery.goTo( slider_index );

            // window.block_gallery.events.on( 'indexChanged' , function(){

            //     console.log( 'entrou' );
            // } )
            // Exibindo modal
            modal.addClass( '-is-visible' );
        });

    });

    jQuery( '.wp-gallery-modal__close' ).on( 'click' , function(){
        var modal = jQuery( '.wp-gallery-modal' );

        if( modal.find( '.tns-slider' ).length > 0 ){
            window.block_gallery.destroy();
        }

        modal.removeClass( '-is-visible' );
    })

    jQuery(document).on('keyup',function(evt) {
        var modal = jQuery( '.wp-gallery-modal' );
        if (evt.keyCode == 27) {
            if( modal.hasClass( '-is-visible' ) ){
                jQuery( '.wp-gallery-modal__close' ).click();
            }
        }
    });


    // jQuery( ".chosen" ).each( function() {
    //     const chosen = jQuery( this );

    //     const choices = new Choices( chosen[0] , {
    //         loadingText: 'Carregando...',
    //         noResultsText: 'Nenhum resultado encontrado',
    //         noChoicesText: 'Nenhum item selecionado',
    //         itemSelectText: ' ',
    //         position: 'bottom',
    //     });
    // } );


    // Navegação das páginas com irmãs
    jQuery( '.page-nav  .page-nav__btn' ).on( 'click' , function(){
        var the_navbar = jQuery( this ).parents( '.page-nav' ),
            max_height = 0;
  
        if( !the_navbar.hasClass( '-is-active' ) ){
            the_navbar.find( '.page-nav__content .page-nav__item' ).each( function(){
                max_height+= jQuery( this ).outerHeight();
            })
        }

        the_navbar.toggleClass( '-is-active' ).find( '.page-nav__content' ).css( { 'max-height' : max_height + 'px' } );

    });

    jQuery( '.page-nav--tab  .page-nav__btn' ).on( 'click' , function(){
        var the_navbar = jQuery( this ).parents( '.page-nav--tab' ),
            max_height = 0;

        if( !the_navbar.hasClass( '-is-active' ) ){
            the_navbar.find( '.page-nav__content .page-nav__item' ).each( function(){
                max_height+= jQuery( this ).outerHeight();
            })
        }

        the_navbar.toggleClass( '-is-active' ).find( '.page-nav__content' ).css( { 'max-height' : max_height + 'px' } );
    });


    jQuery( '.page-nav--tab' ).each( function(){
        var pagenav = jQuery( this );

        pagenav.find( '.page-nav__item' ).on( 'click' , function(e){
            var clicked = jQuery( this );
            if( !clicked.hasClass( '-link-mode' ) ){
                var target = clicked.find( 'a' ).attr( 'href' );

                clicked.addClass( '-is-active' ).siblings().removeClass( '-is-active' );
                jQuery( target ).addClass( '-is-active' ).siblings().removeClass( '-is-active' );
            }
        });

        if( window.location.hash ){
            var hash = window.location.hash,
                target = jQuery( '.page-nav--tab' ).find( '.page-nav__item a[href^="' + hash +'"]' );

            if( target.length > 0 ){
                target.parent( '.page-nav__item' ).click();
            }
        }
    })


    // Accordion
    jQuery( '.accordion' ).each( function(){
        jQuery( this ).find( '.accordion__header' ).on( 'click' , function(){
            var target = jQuery( this ).next(),
                height = 0;

            if( !target.hasClass( '-is-active' ) ){
                height+= target.find( '.accordion__content' ).outerHeight();
            }


            target.toggleClass( '-is-active' ).css( { 'height' : height + 'px' } ).siblings( '.accordion__body' ).removeClass( '-is-active' ).css( { 'height' : 0 + 'px' } );

            jQuery( this ).toggleClass( '-is-active' ).siblings( '.accordion__header' ) .removeClass( '-is-active' );
        })
    })


    if( jQuery( 'select[name="estado"]' ).length > 0 ){
        window.selectestado = new Choices( jQuery( 'select[name="estado"]' )[0] , {
            loadingText: 'Carregando...',
            noResultsText: 'Nenhum resultado encontrado',
            noChoicesText: 'Nenhum item selecionado',
            itemSelectText: ' ',
            position: 'bottom',
        });
    }

    if( jQuery( 'select[name="cidade"]' ).length > 0 ){
        window.selectcidade = new Choices( jQuery( 'select[name="cidade"]' )[0] , {
            loadingText: 'Carregando...',
            noResultsText: 'Nenhum resultado encontrado',
            noChoicesText: 'Nenhum item selecionado',
            itemSelectText: ' ',
            position: 'bottom',
        });
    }

    if( jQuery( 'select[name="regiao"]' ).length > 0 ){
        window.selectregiao= new Choices( jQuery( 'select[name="regiao"]' )[0] , {
            loadingText: 'Carregando...',
            noResultsText: 'Nenhum resultado encontrado',
            noChoicesText: 'Nenhum item selecionado',
            itemSelectText: ' ',
            position: 'bottom',
            searchEnabled: false,
        });

        window.selectregiao.disable();
    }

    jQuery( '.choices__input' ).attr( 'autocomplete' , 'nope' );



    // Get cidades dos estados selecionados
    jQuery( 'select[name="estado"]' ).on( 'change', function(){
        var estado = jQuery( this ).val(); 

        var ajaxurl = jQuery('[name="ajaxurl"]').attr('content');
        
        jQuery.ajax({

            data: { action: 'get_cidades', 'estado':estado },

            type: 'get',
            url: ajaxurl,
            success: function( data ) {
                data = JSON.parse( data );

                var options = '<option value="">Cidade</option>';
                var array_cidades = [];
                if( data.length ){

                    for (var i = data.length - 1; i >= 0; i--) {
                        options += '<option value="'+data[i].term_id+'">'+data[i].name+'</option>';
                        array_cidades.push({ value: data[i].term_id, label: data[i].name, disabled: false })
                    }
                    window.selectcidade.setChoices(
                        array_cidades,
                        'value',
                        'label',
                        true,
                    ).enable();

                    jQuery( 'select[name="cidade"]' ).html( options ).attr('disabled',false);
                    jQuery( 'select[name="cidade"]' ).prop('disabled',false).parents( '.choices' ).removeClass('is-disabled');
                }else{
                   jQuery( 'select[name="cidade"]' ).html( options ).attr('disabled',false);
                   jQuery( 'select[name="cidade"]' ).prop('disabled',false).parents( '.choices' ).removeClass('is-disabled');
                }
                //window.selectregiao.disable();
            },
            error: function( data ) {
                console.log( 'something is wrong ..' )
            }

        });

        return false;
    })

    // Get cidades dos estados selecionados
    jQuery( 'select[name="cidade"]' ).on( 'change', function(){
        var cidade = jQuery( this ).val(); 

        var ajaxurl = jQuery('[name="ajaxurl"]').attr('content');
        
        jQuery.ajax({

            data: { action: 'get_zona', 'cidade':cidade },

            type: 'get',
            url: ajaxurl,
            success: function( data ) {
                data = JSON.parse( data );
                if( data ){
                    window.selectregiao.enable();
                }else{
                    window.selectregiao.disable();
                }
            },
            error: function( data ) {
                console.log( 'something is wrong ..' )
            }

        });

        return false;
    })

    // Validação do CEP
    jQuery( '[name="cep"]' ).on( 'blur', function() {

        //Nova variável "cep" somente com dígitos.
        var cep = jQuery('[name="cep"]').val().replace(/\D/g, '');
        var form = jQuery( this );

        //Verifica se campo cep possui valor informado.
        if ( cep != "" ) {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            if( !validacep.test( cep ) ){
               // cep.addClass( '-error' );
               console.log('CEP incorreto');
                form.find( '.error_msg' ).fadeIn().text( 'CEP incorreto' );
            }
        }
    } )

    // Leia mais e buscar nos resultados
    jQuery( '.onde-comprar .btn-show-more, .where-filter-btn' ).on( 'click', get_lojas );

    // Evento do enter no campo de texto para procurar nos resultados
    jQuery( '[name="nome"]' ).on( 'keydown', function(event) {
        var input = jQuery( this ).val();
        if( event.which == 13 && input != "" ){
            toggleIndice(); // modifica para "todos" o indice de letras
            get_lojas( event );
        }
    })
    jQuery( '[name="nome"]' ).on( 'blur', function(event) {
        var input = jQuery( this ).val();
        if( input == "" ){
            toggleIndice(); // modifica para "todos" o indice de letras
            get_lojas( event );
        }
    })

    jQuery( 'form[name="where-filter"] ' ).on( 'submit', function(event){
        toggleIndice(); // modifica para "todos" o indice de letras
        get_lojas(event);
        return false;
    } );
    
    // Submetendo os formulários com a letra selecionada
    jQuery( '.where-result__item > a' ).on( 'click', function(event){
        jQuery( 'form[name="where-filter"]' ).find( '[name="indice"]' ).val( jQuery( this ).data( 'letra' ) );
        jQuery( '.where-result__item > a' ).removeClass('-is-current');
        jQuery( this ).addClass('-is-current');
        get_lojas( event );
        return false;
    } )

    jQuery( 'form[name="where-filter"] button' ).on( 'click', function(event){
        jQuery( '[name="nome"]' ).val('')
        if( jQuery( this ).hasClass( 'btn-search' ) ){
            jQuery( '[name="cep"]' ).val('');
        }else{
            jQuery( '[name="estado"]' ).find('option:eq(0)').prop('selected', true);
            jQuery( 'select[name="estado"]' ).trigger("chosen:updated");

            jQuery( '[name="cidade"]' ).find('option:eq(0)').prop('selected', true);
            jQuery( 'select[name="cidade"]' ).addClass('is-disabled');

            jQuery( '[name="regiao"]' ).find('option:eq(0)').prop('selected', true);
            jQuery( 'select[name="regiao"]' ).attr('disabled',true);
        }
        toggleIndice(); // modifica para "todos" o indice de letras
    } );

    // Mensagem de erro do CEP
    jQuery( '.error_msg' ).on( 'click', function(){
        jQuery( this ).fadeOut();
        jQuery( this ).parents( '[name="cep"]' ).find('[name="cep"]').removeClass('-error');
    })

    // Rate da resposta no FAQ
    jQuery( '.-js-rate-question' ).on( 'click', function(){
        var id = jQuery( this ).data( 'post_id' );
        var rate = jQuery( this ).data( 'rate' );
        var area = jQuery( this ).data( 'area' );
        likeDeslike( id, rate, area );
    } )

    var answers = localStorage.getItem('answers');
    if( answers ){
        answers = JSON.parse( answers );
        for ( var i = answers.length - 1; i >= 0; i--) {
            if( answers[i] ){
                hide_answer( answers[i].post_id );
            }
        }
    }

    // Scroll das ancoras
    // jQuery('article a[href^="#"]:not(.filter__close)').click(function(e) {   
    //     var dest = jQuery(this).attr('href');

    //     if( jQuery( this ).hasClass( '-has-modal' ) || jQuery( this ).hasClass( 'page-nav__link' ) || jQuery( this ).hasClass( 'hero__cta' ) ){
    //         e.preventDefault();
    //     }else{
    //         if ( ( dest.indexOf( '=' ) == '-1' ) || ( dest.indexOf( '&' ) == '-1' ) ) {
    //             go_to_anchor( dest );
    //         }
    //     }
    // });
    
    // if( window.location.hash ){
    //     var dest = window.location.hash;

    //     if ( ( dest.indexOf( '=' ) == '-1' ) || ( dest.indexOf( '&' ) == '-1' ) ) {
    //         go_to_anchor( dest );
    //     }
    // }

    // Filtro de links
    filterlinks();

    // Busca interna de fale conosco
    jQuery('[name="faq-search"]').on('keyup',function(evt) {
        evt.preventDefault();
        busca_interna_faq();
    });

    jQuery('.-js-internal-faq-search .button').on('click',function(evt) {
        busca_interna_faq();
    });
    jQuery('.clear_search').on('click',function(evt) {
        jQuery('[name="faq-search"]').val('');
        busca_interna_faq();
        evt.preventDefault();
    });

    jQuery('.-get-ajax-options').on('click',function(e) {
        e.preventDefault();
        get_perguntas();
    });

    // Distfinder
    jQuery( '.distfinder' ).each( function(){
        var the_parent = jQuery( this );
        
        jQuery( the_parent ).find( '.-js-show-search' ).on( 'click' , function(e){

            let distfinder_opt = the_parent.find( '.distfinder__search' ).removeClass( '-is-hidden' ).find( '.distchosen' );

            distfinder_opt.forEach( function(){
                const target = jQuery( this );

                // const the_choice = new Choices( target[0] , {
                //     loadingText: 'Carregando...',
                //     noResultsText: 'Nenhum resultado encontrado',
                //     noChoicesText: 'Nenhum item selecionado',
                //     itemSelectText: ' ',
                // })

            })

            the_parent.find( '.distfinder__intro' ).addClass( '-is-hidden' );

            e.preventDefault();

        })
    })


    // Botão Linhas
    jQuery( '.hero__arrow, .hero__cta' ).on( 'click' , function(){
        scroll_to_el( jQuery( '.block--lista-produtos' ) );
    })

    // Botão Hero de linhas

    // // Submit dos formulários do contact form
    // jQuery( '.wpcf7-form' ).on( 'submit', function () {
    //     jQuery( this ).find( '.telefone, .celular, .cep, .cpf, .cnpj' ).each( function () {
    //         let new_val = jQuery( this ).val();
    //         if ( new_val ) new_val = new_val.replace( /\D/g, '' );
    //         jQuery( this ).val( new_val );
    //     } );
    // } );

    ////////////////////////////////////////////////////
    //                                                //
    //            contact form cuidado !!             //
    //                                                //
    ////////////////////////////////////////////////////

    // Verificando Mail sent do Contact form
    jQuery('.wpcf7 .wpcf7-submit').on( 'click', function(){
        var parent =  jQuery( this ).parents('.modal__content');
        parent.find( '.loader-content' ).removeClass( '-is-hidden' );
    } )
    jQuery('.wpcf7').on('wpcf7invalid wpcf7spam wpcf7mailfailed wpcf7mailsent', function(e){
        var parent =  jQuery( this ).parents('.modal__content');
        var role = false;
        var loader = parent.find( '.loader-content' ); // loader
        var response = parent.find( '.response-modal' ); // html personalizado
        var output = parent.find( '.wpcf7-response-output' ); // mensagem
        if( !role ){
            loader.removeClass( '-is-hidden' );

            switch( e.type ){
                case 'wpcf7invalid':
                    role = 'alert';
                    if( parent.length ){
                        // se invalido
                        loader.addClass("-is-hidden");
                    }
                break;
                case 'wpcf7spam':
                    role = 'invalid';
                    if( parent.length ){
                        // se spam SPAM SPAM SPAM EGGS SALSICH SPAM!!
                        loader.addClass("-is-hidden");
                    }
                break;
                case 'wpcf7mailfailed':
                    role = 'invalid';
                    if( parent.length ){
                        // se invpalido
                        loader.addClass("-is-hidden");
                    }
                break;
                case 'wpcf7mailsent':
                    role = 'success';
                    if( parent.length ){
                        // deu certo vuo vagabundo !
                        loader.addClass( '-is-hidden' );
                        response.removeClass("-is-hidden");
                        parent.find( '.modal__limit' ).fadeOut(200);
                        parent.find( '.response-modal__body p' ).text( e.detail.apiResponse.message );
                        
                    }
                break;
            }
        }
        jQuery( this ).find( '.screen-reader-response').attr('role', role );
    });

    jQuery( '.response-modal__footer .help-modal__link' ).on( 'click', function(){
        var parents = jQuery( this ).parents( '.modal' ).find( '.modal__close' ).click();
        return false;
    } )

    // LGPD
    jQuery( '.close__lgpd' ).on( 'click', function(){
        var parents = jQuery( this ).parents( '#lgpd' );
        parents.fadeOut( 200 );
        return false;
    } )
    jQuery( '#lgpd .button--small' ).on( 'click', function(){
        var parents = jQuery( this ).parents( '#lgpd' );
        var form = parents.find( '.lgpd_form' );
        if( form.length <= 0 ){
            lgpd_verify( true );
        }else{
            form.removeClass( '-is-hidden' );
        }
        return false;
    })

    // função que verifica se LGPD foi respondido
    lgpd_verify( false );

    jQuery( '#lgpd input[type="submit"]' ).on( 'click', function(){
        var parents = jQuery( this ).parents( '.wpcf7-form' );
        var email = parents.find( 'input[type="email"]' ).val();
        var accept = parents.find( 'input[type="checkbox"]:checked' );

        if( accept.length && email.length ){
            lgpd_verify( true );
        }

    })

    // bloco newsletter com lista de links
    jQuery( '.newsletter__form input[type="submit"]' ).on( 'click', function(){
        var parent = jQuery( this ).parents( '.newsletter__form' );
        var field = parent.find( 'input[type="email"] ' ).val();
        var verify = validacaoEmail( field );
        if( verify ){
            parent.find( '.newsletter__cf ' ).addClass( '-is-hidden' );
            parent.find( '.newsletter__info ' ).addClass( '-is-hidden' );
            parent.find( '.newsletter__title ' ).addClass( '-is-hidden' );
            parent.find( '.links_download ' ).removeClass( '-is-hidden' );
        }
    } )


    jQuery( '.newsletter.-custom-button').each( function(){
        var the_newsletter = jQuery( this ),
            custom_style = the_newsletter.data( 'btnstyle' );

        the_newsletter.find( '.wpcf7-submit' ).attr( 'style' , custom_style );


    })

    // fechar modal no click dos links
    jQuery( '.modal a:not(.modal-aba)' ).on( 'click', function () {
        jQuery( this ).parents( '.modal' ).find( '.modal__close' ).click();
    } );


    // Floating
    if( is_mobile() || is_tablet() ){

        jQuery( '.floating' ).on( 'click' , function(e){
            let target = jQuery( this );

            if( !target.hasClass( '-is-active' ) ){
                target.addClass( '-is-active' );
                e.preventDefault();
            }

        } );

        jQuery( '.floating__close' ).on( 'click' , function(e){

            jQuery('.floating' ).removeClass( '-is-active' );

            e.stopPropagation(); 
            e.preventDefault();
        })
    }

    // Like Deslike
    if( typeof(myVariable) != "undefined" ){
        // Deslike
        jQuery( '.rate__btn--deslike' ).on( 'click',function(){
            let item_text = jQuery( this ).parents( '.accordion__body' ).prev( '.accordion__header' ).find( 'span' ).text();
            ga('send', {
               hitType: 'event',
               eventCategory: 'FAQ',
               eventAction: 'Deslike',
               eventLabel: item_text
            });
        } );
        // Like
        jQuery( '.rate__btn' ).on( 'click',function(){
            let item_text = jQuery( this ).parents( '.accordion__body' ).prev( '.accordion__header' ).find( 'span' ).text();
            ga('send', {
               hitType: 'event',
               eventCategory: 'FAQ',
               eventAction: 'Like',
               eventLabel: item_text
            });
        } );
    }


    // Ajustando blocos wp-block-image com alinhamento left
    if( !is_mobile() || !is_tablet()){
        jQuery( '.wp-block-group figure.alignleft' ).each( function(){
            let block_img = jQuery( this ),
                parent = block_img.parent( '.wp-block-image' );

            block_img.parent( '.wp-block-image' ).attr( 'style' , 'float: left; min-height: 150px;' );
        })

        jQuery( '.wp-block-group figure.alignright' ).each( function(){
            let block_img = jQuery( this ),
                parent = block_img.parent( '.wp-block-image' );

            block_img.parent( '.wp-block-image' ).attr( 'style' , 'float: right; min-height: 150px;' );
        })
    }




    // Evento do bloco video__modal
    jQuery( '.video' ).each( function(){
        var target = jQuery( this ),
            video_id = target.data( 'video-id' ),
            modal = target.find( '.video__modal' );

        target.find( '.video__player-col .video__player' ).on( 'click' , function(){

            if( target.hasClass( '-on-new-tab' ) ){
                var yt_url =  'https://www.youtube.com/watch?v=' + video_id;
                window.open( 'https://www.premierpet.com.br/filtro-de-links/?url=' + yt_url , '_blank');
            }else{
                modal.find( '.video__player' ).html( '<iframe src="https://www.youtube-nocookie.com/embed/' + video_id + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' );
                modal.addClass( '-is-active' );
            }

        })

        modal.on( 'click' , function(e){
            e.stopPropagation();
            if( modal.hasClass( '-is-active' ) ){
                target.find( '.video__modal-close' ).click();
            }
        })

        target.find( '.video__modal-close' ).on( 'click' , function(){
            modal.removeClass( '-is-active' );
            modal.find( '.video__player' ).html( ' ' );
        })
            
        jQuery(document).on('keyup',function(evt) {
            if (evt.keyCode == 27) {
                if( modal.hasClass( '-is-active' ) ){
                    target.find( '.video__modal-close' ).click();
                }
            }
        });
    })

});
function validacaoEmail( field ) {
    var usuario = field.substring( 0, field.indexOf("@") );
    var dominio = field.substring( field.indexOf("@")+ 1, field.length);

    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    }
    else{
        return false
    }
}

function lgpd_verify( set_lgpd ){
    var lgpd_content = jQuery( '#lgpd' );

    var lgpd = localStorage.getItem( 'lgpd' );
    var lgpd = JSON.parse( lgpd );

    if( !lgpd ){
        lgpd_content.removeClass( '-is-hidden' );
    }

    if( set_lgpd ){
        if( !lgpd ){
            localStorage.setItem( 'lgpd', true );
            lgpd_content.addClass( '-is-hidden' );
        }
    }
}

function toggleIndice(){
    jQuery( 'form[name="where-filter"]' ).find( '[name="indice"]' ).val('todos');
    jQuery( '.where-result__item > a' ).removeClass('-is-current');
    jQuery( '.where-result__item:first > a' ).addClass('-is-current');
}

function get_perguntas(){
    var ajaxurl = jQuery( '[name="ajaxurl"]' ).attr('content');
    var pet     = jQuery( '[name="pet"]:checked' ).val();
    var idade   = jQuery( '[name="idade"]' ).val();
    var sexo    = jQuery( '[name="sexo"]:checked' ).val();

    console.log( pet, idade, sexo );

    jQuery.ajax({
        data: { action: 'get_perguntas_alimento_ideal', 'pet':pet, 'idade':idade, 'sexo':sexo, },
        type: 'get',
        url: ajaxurl,
        beforeSend: function( xhr ){
            canBeLoaded = false; 
        },
        success:function( data ){

            var results = JSON.parse( data );

            if( results ){
                console.log( results )
            }
        }
    })
}

function busca_interna_faq(){

    var txt = jQuery('[name="faq-search"]').val();

    if ( txt.length ) {
        jQuery( '.page-nav--tab' ).addClass("-is-inactive");
        var h = jQuery( '.accordion__header' ).css("display", "block");
        jQuery( '.accordion' ).find( '.accordion__header' ).each( function(){
            var header_text = jQuery( this ).find( 'span' ).text().toLowerCase(),
                id = jQuery( this ).data( 'id' ),
                body_text = jQuery( 'dd[data-id="' + id + '"]' ).text().toLowerCase();
            if ( ( !header_text.includes( txt.toLowerCase() ) ) && !body_text.includes( txt.toLowerCase() ) ) {
                jQuery( this ).css("display", "none");
                jQuery( '.page-tab' ).removeClass("-is-active");
            }
        });
        jQuery( '.clear_search' ).removeClass("-is-hidden");

        h.filter( function(){
            if( jQuery( this ).css('display') == 'block' ) {
                jQuery( this ).parents('.page-tab').addClass("-is-active");
            }
        });
    }else{
        jQuery( '.clear_search' ).addClass("-is-hidden");
        jQuery( '.page-nav--tab' ).removeClass("-is-inactive");
        jQuery( '.accordion__header' ).attr("style", "");
        jQuery( '.page-tab' ).attr("style", "");
        jQuery( '.page-nav__item:first > a' ).click()
    }

}

// Para interceptar links externos
function filterlinks(){

    var linkfilter = jQuery( 'meta[name="linkfilter"]' ).attr( 'content' );

    if( linkfilter ){

        jQuery( 'a' ).each( function(){
            var nao_tem = false;
            var parent = jQuery( this ).parent( '.menu-item' ).hasClass('-js-filtered_link');
            var link = jQuery( this ).hasClass('-js-filtered_link');

            if( parent ){
                nao_tem = true;
            }
            if( link ){
                nao_tem = true;
            }

            if( !nao_tem ){

                var href = jQuery( this ).attr('href');

                if( href && href.charAt(0) != '/' ){
                    jQuery( this ).attr( 'href', verifyUrl( href ) );
                }

            }
        } );

    }
}

function verifyUrl( href ){

    var linkfilter = jQuery( 'meta[name="linkfilter"]' ).attr( 'content' );
    var pattern = /:\/\/(www[0-9]?\.)?(.[^/:]+)/i;
    var response = href;
    var tem = false;

    if( href && linkfilter && dominios && !href.includes('#') ){

        dominios.map( function( dom ){

            var m = dom.match( pattern );
            var match = href.match( pattern );
            
            if ( match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0 && m != null && m.length > 2 && typeof m[2] === 'string' && m[2].length > 0 ) {
                if( m[2] == match[2] ){
                    tem = true;
                    response = href;
                }
            }

        } )

        if( !tem ){
            response = linkfilter+'?url='+href;
        }

    }

    return response;
}

function likeDeslike( id, rate, area ){
   
    var ajaxurl  = jQuery( '[name="ajaxurl"]' ).attr('content');
    jQuery.ajax({
        data: { action: 'likeDeslike', 'id':id, 'rate':rate },
        type: 'post',
        url: ajaxurl,
        beforeSend: function( xhr ){
            canBeLoaded = false; 
        },
        success:function( data ){
            var results = JSON.parse( data );
            if( results ){
                var obj = { 'post_id': area+id };
                set_vote( obj );
            }
        }
    } );
}

function set_vote( obj ){
    var answers = localStorage.getItem('answers');
    if( answers ){
        answers = JSON.parse( answers );
        answers.push( obj );
        localStorage.setItem("answers", JSON.stringify( answers ) );
        hide_answer( obj.post_id );
    }else{
        var answers = [];
        answers.push( obj );
        localStorage.setItem("answers", JSON.stringify( answers ) );
        hide_answer( obj.post_id );
    }
}

function hide_answer( id ){
    jQuery( '#rate-'+id ).fadeOut( function(){
        jQuery( '#feedback-'+id ).removeClass( '-is-hidden' );
    });
}


// Função ajax da pagina onde comprar
function get_lojas( event ){
    var debug = false;
    var busca_nome = false;
    var linkfilter = jQuery( 'meta[name="linkfilter"]' ).attr( 'content' );

    var ajaxurl  = jQuery( '[name="ajaxurl"]' ).attr('content');
    
    var indice   = jQuery( '[name="indice"]' ).val();
    var estado   = jQuery( '[name="estado"]' ).val();
    var cidade   = jQuery( '[name="cidade"]' ).val();
    var regiao   = jQuery( '[name="regiao"]' ).val();
    var nome     = jQuery( '[name="nome"]' ).val();
    var lojaonline     = jQuery( '[name="lojaonline"]' ).val();
    var paginado = false;
    
    if(lojaonline){
        var cep      = '';
    }else{
        var cep      = jQuery( '[name="cep"]' ).val().replace(/\D/g, '');
    }
    
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;   

    if ( estado == "" && cep == "") {  //Verifica se campo Estado ou CEP possui valor informado. 
        $( "#erro-ondecomprar" ).text( "Insira um CEP ou escolha um Estado" );        
    }else if(estado != "" && cidade == "" && !lojaonline){
        $( "#erro-ondecomprar" ).text( "Escolha uma cidade" ); 
    }else if(cep != "" && !validacep.test( cep ) ){ //Verifica se CEP possui valor correto.            
           $( "#erro-ondecomprar" ).text( "CEP incorreto" );
    }else{
        $( "#erro-ondecomprar" ).text( "" );   
        var target = jQuery( event.target );

        if( target && target.is( '.btn-show-more' ) ){
            paginado = parseInt( jQuery( '.btn-show-more' ).data( 'paginado' ) ) + 1;
            jQuery( '.btn-show-more' ).data( 'paginado', paginado );
        }else{
            jQuery( '.btn-show-more' ).data( 'paginado', 1 ); 
        }

        if( target &&  jQuery( '[name="nome"]' ).is(":focus") || target.is( '.where-filter-btn' ) ){
            busca_nome = true;
        }

        jQuery( '.results' ).removeClass('-is-hidden');
        jQuery( '.loader-content' ).removeClass('-is-hidden');

        jQuery.ajax({
            data: { action: 'get_lojasEstado', 'cep':cep, 'indice':indice, 'paginado':paginado, 'estado':estado, 'cidade':cidade, 'regiao':regiao, 'nome':nome, 'lojaonline':lojaonline, 'ajax':true },
            type: 'get',
            url: ajaxurl,
            beforeSend: function( xhr ){
                canBeLoaded = false; 
            },
            success:function( data ){

                var results = JSON.parse( data );

                if( results ){


                    var tel = '';
                    var site = '';
                    var map = '';
                    var html = '';

                    if( 'lojas' in results && results.lojas ){

                        for (var i = 0; i < results.lojas.length; i++) {
                            var loja = results.lojas[i];
                            if( loja.tel ){
                                tel +='<a class="store__phone" data-intercept="false" rel="noopener noreferrer nofollow" href="tel:'+loja.tel+'" target="_blank"> <b>'+vars_onde_comprar.tel+'</b> '+loja.tel+'</a>';
                            }
                             if( loja.site ){
                                try {
                                    let url = new URL(loja.site);
                                    site ='<span>'+loja.cidade+'</span>';
                                    siteicon ='<a class="store__site-link" target="_BLANK" data-intercept="false" rel="noreferrer" rel="noopener noreferrer nofollow" href="'+linkfilter+'?url='+loja.site+'"  target="_blank"> <img src="/wp-content/themes/premierpet/assets/img/icon-shop.png"> </a>';
                                  } catch(err) {
                                    site ='<span>'+loja.cidade+'</span>';
                                    siteicon ='<a class="store__site-link" target="_BLANK" data-intercept="false" rel="noreferrer" rel="noopener noreferrer nofollow" href="'+linkfilter+'?url=https://'+loja.site+'"  target="_blank"><img src="/wp-content/themes/premierpet/assets/img/icon-shop.png"> </a>';
                                  }                              
                                
                             }
                            if( loja.google ){
                                map ='<a class="store__map-link" target="_BLANK" data-intercept="false" rel="noreferrer" rel="noopener noreferrer nofollow" href="'+linkfilter+'?url='+loja.google+'"  target="_blank"> '+vars_onde_comprar.mapa+' </a>';
                            }
                            
                            if(lojaonline && loja.site != ''){ //Lista lojas online                               
                                html += '<li class="store-list__item" title="'+loja.nome+'" alt="'+loja.nome+'"><div class="store">';
                                html += '<h3 class="store__name" data-cep="'+loja.cep+'">'+loja.nome+'</h3>';
                                html += ( site ? site : '' );                               
                                html += ( siteicon ? siteicon : '' );
                                html += '</div></li>';
                            }else{ // lista lojas físicas
                                html += '<li class="store-list__item" title="'+loja.nome+'" alt="'+loja.nome+'"><div class="store">';
                                html += '<h3 class="store__name" data-cep="'+loja.cep+'">'+loja.nome+'</h3>';
                                html += '<p class="store__adress">'+loja.endereco+ ', '+vars_onde_comprar.cep+' '+ loja.cep + ( tel ? ', '+tel : '') +'</p>';
                                html += ( map ? map : '' );
                                html += '</div></li>';
                            }
                            
                        }

                        // Se for adicionando, ou fazendo replace de lista de lojas
                        if( target && target.is( '.btn-show-more' ) ){
                            jQuery( '.store-list' ).append( html );
                        }else if( target && target.is( '[name="nome"]' ) ){ // se for o campo de busca nos resultados
                            jQuery( '.store-list' ).html( html );
                        }else{// se não, faz replace no html da lista
                            jQuery( '.store-list' ).html( html );
                        }

                        // Esconde ou não o veja mais
                        if( !results.temmais ){
                            jQuery( '.btn-show-more' ).hide();
                        }else{
                            jQuery( '.btn-show-more' ).show();
                        }

                        // Adicionando total de lojas encontradas
                        if( results.total ){
                        jQuery( '.where-result__resume' ).find( 'span' ).html( results.total ) 
                        }

                    }else{
                        jQuery( '.where-result__resume' ).find( 'span' ).html( 0 )
                        jQuery( '.store-list' ).html( '' );
                        jQuery( '.btn-show-more' ).hide();
                    }

                    // Só atrubuir debug = true onde quiser testar
                    if( debug ){
                        console.log('Resultado do get: ', results );
                    }
                    
                }
                jQuery( '.loader-content' ).addClass('-is-hidden');
            }

        });

    }

    
}

function OpenHighlightModal( target ){
    let overlay = target.parents( '.highlight__map' ),
        modal = overlay.find( '.highlight__modal' ),
        data = target.data( 'modal' );

    overlay.addClass( '-is-active' );

    modal.find( '.highlight__modal-img' ).html( `<img src="${data.img}"  alt="${data.title}">` );
    modal.find( '.highlight__modal-title' ).html( data.title );
    modal.find( '.highlight__modal-desc' ).html( data.content );
}


function CloseHighlightModal( target ){
    let overlay = target.parents( '.highlight__map' );

    overlay.removeClass( '-is-active' );
}


// function go_to_anchor( target ){
//     if( jQuery( target ).length > 0 ){
//         var target_top = jQuery(target).offset().top;
//         var header_height = jQuery( '.header' ).outerHeight() * 2

//         // Fallback, tenta achar um elemento próximo pelo .limit
//         if( target_top == 0){
//             if( jQuery( target ).parents( '.limit' ).length > 0 ){
//                 target_top  = jQuery( target ).parents( '.limit' ).offset().top;
//             }else if( jQuery( target ).parents( 'section' ) ){
//                 target_top  = jQuery( target ).parents( 'section' ).offset().top;
//             }
//         }

//         jQuery('html,body').animate({ 
//             scrollTop: ( target_top - header_height ) 
//         }, 'slow'); 
//     }
// }

function scroll_to_el( target ){
    if( jQuery( target ).length > 0 ){
        var target_top = target.offset().top;
        var header_height = jQuery( '.header' ).outerHeight() * 2

        jQuery('html,body').animate({ 
            scrollTop: ( target_top - header_height ) 
        }, 'slow'); 
    }
}




const MOB_ACCORDION = document.querySelectorAll( ".mob-accordion" );

Array.prototype.forEach.call( 
    MOB_ACCORDION, (el, index) => el.querySelectorAll( '.mob-accordion__header' )[0].addEventListener( 'click' , () => {
        if( is_mobile() || is_tablet()){
            let accordion_body = el.querySelectorAll( '.mob-accordion__body' ),
                accordion_grid = el.querySelectorAll( '.grid' ),
                accordion_body_height = accordion_body[0].offsetHeight;

            console.log( el.nextElementSibling );
        
            if( accordion_grid.length > 0 ){
                accordion_body_height = accordion_body_height != 0 ? 0 : accordion_grid[0].offsetHeight + 20;
            }
        
            accordion_body[0].setAttribute("style", "height: " + accordion_body_height  + "px" );
        }
    })
)



function is_mobile(){
    return  ( window.innerWidth <= 640 );
}

function is_tablet(){
    return  ( ( window.innerWidth <= 1024 ) && ( window.innerWidth >= 640 ) );
}

//Adicionado evento onClick no para o botão de Cookies do rodapé

if (document.getElementById("menu-item-168581")){
    $('#menu-item-168581').css('cursor','pointer');
    $('#menu-item-168581').click(function(){
        console.log('Clique!!');
    });
    $('#menu-item-168581').click(showConsentPreferencesPopup);
}

if(document.getElementById("menu-item-161124")){
    $('#menu-item-161124').css('cursor','pointer');
    $('#menu-item-161124').click(function(){
        console.log('Clique!!');
    });
    $('#menu-item-161124').click(showConsentPreferencesPopup);
}

if(document.getElementById("cookie_footer_matchpet")){
    console.log('Clique!');
    $('#cookie_footer_matchpet').css('cursor', 'pointer');
    $('#cookie_footer_matchpet').click(function(){
        console.log('Clique!!');
    });
    $('#cookie_footer_matchpet').click(showConsentPreferencesPopup);
}



//Campo de busca no fomrulário Fale Conosco
// document.addEventListener("DOMContentLoaded", function() {
//     $(document).ready(function () {
//         $('select').selectize({
//             sortField: 'text'
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(function ($) {
            // Verifique se estamos na página específica antes de inicializar o Selectize
            if ($('body').hasClass('page-id-35800')) {
                // Certifique-se de que selectize está carregado
                if (typeof $.fn.selectize !== 'undefined') {
                    $('select').selectize({
                        sortField: 'text'
                    });
                } else {
                    console.error("Selectize not loaded properly.");
                }
            }
        });
    } else {
        console.error("jQuery not loaded properly.");
    }
});


// POP-UP DE INTENÇÃO DE SAIDA
const CookieService = {
    setCookie(name, value, days) {
        let expires = '';

        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); //produto com 1 dia de expiração
            //date.setTime(date.getTime() + (days * 0)); //hml
            expires = '; expires=' + date.toUTCString();
        }

        document.cookie = name + '=' + (value || '')  + expires + ';';
    },

    getCookie(name) {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            if (cookie.indexOf(name + '=') > -1) {
                return cookie.split('=')[1];
            }
        }

        return null;
    }
};

const exit = e => {
    const shouldExit =
        [...e.target.classList].includes('exit-intent-popup') || // user clicks on mask
        e.target.className === 'close' || // user clicks on the close icon
        e.keyCode === 27; // user hits escape

    if (shouldExit) {
        document.querySelector('.exit-intent-popup').classList.remove('visible');
    }
};

// Definindo a função mouseEvent
const mouseEvent = e => {
    const shouldShowExitIntent = 
        !e.toElement && 
        !e.relatedTarget &&
        e.clientY < 10;

    if (shouldShowExitIntent) {
        document.removeEventListener('mouseout', mouseEvent);

        const exitIntentPopup = document.querySelector('.exit-intent-popup');
        if (exitIntentPopup) {
            exitIntentPopup.classList.add('visible');
            CookieService.setCookie('exitIntentShown', true, 30);
        }
    }
};

// Verificando se o cookie de exit intent já foi mostrado
if (!CookieService.getCookie('exitIntentShown')) {
    setTimeout(() => {
        document.addEventListener('mouseout', mouseEvent);

        const exitIntentPopup = document.querySelector('.exit-intent-popup');
        if (exitIntentPopup) {
            exitIntentPopup.addEventListener('click', exit);
        }

        document.addEventListener('keydown', exit);
    }, 0);
}

// ############# FIM POP-UP #################
if (document.getElementById("menu-item-168581")){
    $('#menu-item-168581').css('cursor','pointer');
    $('#menu-item-168581').click(function(){
        console.log('Clique!!');
    });
    $('#menu-item-168581').click(showConsentPreferencesPopup);
}


// EFEITO ZOOM NA GALERIA DE FOTOS DO PRODUTO
$(".magnified").hover(function(e){
    //Store position & dimension information of image
    var imgPosition = $(".magnify").position(),
        imgHeight = $(".magnified").height(),
        imgWidth = $(".magnified").width();
    
    //Show mangifier on hover
    $(".magnifier").show();
    
    //While the mouse is moving and over the image move the magnifier and magnified image
    $(this).mousemove(function(e){
      //Store position of mouse as it moves and calculate its position in percent
      var posX = e.pageX -130,
          posY = e.pageY - 230,
          percX = (posX / imgWidth) * 100,
          percY = (posY / imgHeight) * 100,          
          perc = percX + "% " + percY + "%";      
          
      //Change CSS of magnifier, move it to mouse location and change background position based on the percentages stored.
      $(".magnifier").css({
        top:posY,
        left:posX,
        backgroundPosition: perc
      });
    });
  }, function(){
    //Hide the magnifier when mouse is no longer hovering over image.
    $(".magnifier").hide();
  });

$(document).ready(function() {
    $('.mob-accordion is-style--bg-gray#table-2').hide();
    $('.mob-accordion#table-2').hide();
    $('.mob-accordion#table-1').each(function() {
        $(this).find('td:empty').hide();
    });

    $(window).on('load', function() {
        setTimeout(function() {
            $('.mob-accordion.is-style--bg-gray#table-1').each(function() {
                $(this).find('td:empty').show();
            });
        }, 2000); // Atraso de 2000 milissegundos (2 segundos)
    });
    
});

// $(document).ready(function() {
//     // Desabilite o botão por padrão
//     //$('#news-submit').prop('disabled', true);

//     // Quando houver uma mudança em qualquer campo do formulário ou no radio
//     $('#form-field-name, #form-field-email, input[name="form_fields[field_4503038]"]').on('input change', function() {
//         // Verifique se pelo menos um campo está preenchido e um rádio está marcado
//         if ($('#form-field-name').val() !== '' && $('#form-field-email').val() !== '' && $('input[name="form_fields[field_4503038]"]:checked').length > 0) {
//             // Se pelo menos um campo estiver preenchido e um rádio estiver marcado, habilite o botão
//             $('#news-submit').prop('disabled', false);
//         } else {
//             // Se nenhum campo estiver preenchido ou nenhum rádio estiver marcado, desabilite o botão
//             //$('#news-submit').prop('disabled', true);
//         }
//     });
// });

$(document).ready(function() {
    // Desabilite o botão por padrão
    //$('#filhotes_button').prop('disabled', true);

    // Quando houver uma mudança em qualquer campo do formulário ou no radio
    $('#form-field-name, #form-field-email, input[name="form_fields[field_8dcee68]"]').on('input change', function() {
        // Verifique se pelo menos um campo está preenchido e um rádio está marcado
        if ($('#form-field-name').val() !== '' && $('#form-field-email').val() !== '' && $('input[name="form_fields[field_8dcee68]"]:checked').length > 0) {
            // Se pelo menos um campo estiver preenchido e um rádio estiver marcado, habilite o botão
            $('#filhotes_button').prop('disabled', false);
        } else {
            // Se nenhum campo estiver preenchido ou nenhum rádio estiver marcado, desabilite o botão
            $('#filhotes_button').prop('disabled', true);
        }
    });
});


$('.coblocks-column-2201493365').css('margin-top', '10%');

$('#popupButton').click(function() {
    $('.wp-content').css('filter', 'blur(10px)');
});


$(document).ready(function() {
    $('.fade-effect').css('opacity', '0.5'); // Define a opacidade inicial
    $('.fade-effect').animate({ opacity: 1 }, 2000); // Animação para aumentar a opacidade para 1 em 1000ms (1 segundo)
});

$(".col-center").animate({top: '25%'});

$(".page-template-page-guia-de-pets-gatos .col-center").animate({top: '20%'});


$(".col-center-mobile").animate({ top: '32%' }, 1000, function() {
    // Quando a animação termina, aumenta a opacidade do span
    $(".fade-effect").animate({ opacity: 1 }, 1000);
});


$(document).ready(function() {
    // Adiciona evento de clique ao botão Gatos
    $(document).on('click', '#btnGatos', function() {
        $('.Gatos').show(); // Oculta a div dos gatos
        $('.Cães').hide(); // Exibe a div dos cães
    });

    // Adiciona evento de clique ao botão Cães
    $(document).on('click', '#btnCaes', function() {
        $('.Gatos').hide(); // Exibe a div dos gatos
        $('.Cães').show(); // Oculta a div dos cães
    });
});

// Função para ocultar a seção de guia
function ocultarGuia() {
    $('.page-template-page-guia-de-pets-gatos  .guiaSection').hide(); 
}

ocultarGuia();

$('.buttonGuia').click(function() {
    // Rolando a página para o topo
    //$('html, body').animate({ scrollTop: 0 }, 'fast');

    // Ocultando a seção inicial e mostrando a seção de guia
    $('.page-template-page-guia-de-pets-gatos .initSection').hide(); 
    $('.page-template-page-guia-de-pets-gatos  .guiaSection').show(); 

    // Animação para mover o elemento com a classe ".col-center" para 20% do topo da página
    $(".page-template-page-guia-de-pets-gatos .col-center").animate({top: '20%'});

    // Definindo a opacidade inicial e animando para aumentar a opacidade para 1
    $('.page-template-page-guia-de-pets-gatos .fade-effect').css('opacity', '0.5');
    $('.page-template-page-guia-de-pets-gatos .fade-effect').animate({ opacity: 1 }, 2000);
});

// Função para voltar à seção inicial quando o botão de voltar for clicado
function backGuia() {
    $('.backGuia').click(function() {
        $('.page-template-page-guia-de-pets-gatos .initSection').show(); 
        $('.page-template-page-guia-de-pets-gatos .guiaSection').hide(); 
    });
}

// Chama a função para voltar à seção inicial
backGuia();

  
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se a URL contém "totem/#meuid"
    if (window.location.href.includes("https://hml.premierpet.com.br/meu-pet/totem-fmvzusp/#searchGuia")) {
        // Adiciona uma classe ao corpo do documento
        $('.page-template-page-guia-de-pets-gatos .initSection').hide(); 
        $('.page-template-page-guia-de-pets-gatos .guiaSection').show(); 
        
        // Rola para o elemento com ID 'searchGuia'
        var target = $('#searchGuia');
        if(target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500); // Tempo de animação em milissegundos
        }
    }
});

// Função para abrir o popup quando clicar no col-md-4
$('.col-md-4').click(function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    
    // Fecha todos os popups abertos
    $('.popup').hide();
    
    // Obtém o número do índice associado ao col-md-4
    var index = $(this).attr('class').split(' ').find(c => c.startsWith('col-md-4-')).split('-')[3];
    
    // Exibe o popup associado
    $('.popup.popup' + index).show();
});

// Função para fechar o popup
$('.fechar-popup').click(function() {
    // Fecha o popup atual
    $(this).closest('.popup').hide();
});

$('.abrir-popup').click(function() {
    $('.popup').fadeIn(); // Exibe o popup
    $('.backdrop').fadeIn(); // Exibe o fundo desfocado
});

$('.fechar-popup').click(function() {
    $('.popup').fadeOut(); // Oculta o popup
    $('.backdrop').fadeOut(); // Oculta o fundo desfocado
});

// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("filhotes_form").addEventListener("submit", function(event) {
//         // Impedir o envio padrão do formulário
//         event.preventDefault();
    
//         // Verificar se o usuário está em um dispositivo móvel
//         var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
//         // Obter todos os elementos de entrada de rádio
//         var radioButtons = document.querySelectorAll('input[name="form_fields[field_8dcee68]"]');
        
//         // Variável para armazenar o valor selecionado
//         var valorSelecionado;
        
//         // Iterar sobre os elementos de entrada de rádio para encontrar o selecionado
//         radioButtons.forEach(function(radioButton) {
//             if (radioButton.checked) {
//                 valorSelecionado = radioButton.value;
//             }
//         });
    
//         // Definir os links de redirecionamento com base na opção selecionada
//         var linksRedirecionamento = [];
//         switch (valorSelecionado) {
//             case "Gato":
//                 if (isMobile) {
//                     window.open("https://premierpet.com.br/wp-content/uploads/2024/04/gato_ebook.pdf");
//                 } else {
//                     linksRedirecionamento.push("https://premierpet.com.br/wp-content/uploads/2024/04/gato_ebook.pdf");
//                 }
                
//                 break;
//             case "Cachorro":
//                 if (isMobile) {
//                     window.open("https://premierpet.com.br/wp-content/uploads/2024/04/cao_ebook.pdf");
//                 } else {
//                     linksRedirecionamento.push("https://premierpet.com.br/wp-content/uploads/2024/04/cao_ebook.pdf");
//                 }
//                 break;
//             case "Ambos":
//                 if (isMobile) {
//                     window.open("https://premierpet.com.br/wp-content/uploads/2024/04/cao_gato_ebook.pdf");
//                 } else {
//                     linksRedirecionamento.push("https://premierpet.com.br/wp-content/uploads/2024/04/cao_ebook.pdf");
//                     linksRedirecionamento.push("https://premierpet.com.br/wp-content/uploads/2024/04/gato_ebook.pdf");
//                 }
//                 break;
//             default:
//                 // Tratamento de erro se nenhuma opção for selecionada
//                 break;
//         }
    
//         // Realizar o download dos arquivos PDF para todas as opções selecionadas (caso não seja um dispositivo móvel)
//         if (!isMobile) {
//             linksRedirecionamento.forEach(function(link) {
//                 var anchor = document.createElement('a');
//                 anchor.href = link;
//                 anchor.style.display = 'none'; // Oculta o elemento
//                 anchor.setAttribute('download', '');
//                 document.body.appendChild(anchor);
//                 anchor.click();
//                 document.body.removeChild(anchor);
//             });
//         }
        
//         // Ocultar a mensagem de sucesso após 4 segundos
//         setTimeout(function() {
//             $('.elementor-message-success').hide();
//         }, 4000);
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("filhotes_form");
    if (form) {
        form.addEventListener("submit", function(event) {
            // Impedir o envio padrão do formulário
            event.preventDefault();
        
            // Verificar se o usuário está em um dispositivo móvel
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
            // Obter todos os elementos de entrada de rádio
            var radioButtons = document.querySelectorAll('input[name="form_fields[field_8dcee68]"]');
            
            // Variável para armazenar o valor selecionado
            var valorSelecionado;
            
            // Iterar sobre os elementos de entrada de rádio para encontrar o selecionado
            radioButtons.forEach(function(radioButton) {
                if (radioButton.checked) {
                    valorSelecionado = radioButton.value;
                }
            });
        
            // Definir os links de redirecionamento com base na opção selecionada
            var linksRedirecionamento = [];
            switch (valorSelecionado) {
                case "Gato":
                    if (isMobile) {
                        window.open("https://premierpet.com.br/wp-content/uploads/2024/04/gato_ebook.pdf");
                    } else {
                        linksRedirecionamento.push("https://premierpet.com.br/wp-content/uploads/2024/04/gato_ebook.pdf");
                    }
                    
                    break;
                case "Cachorro":
                    if (isMobile) {
                        window.open("https://premierpet.com.br/wp-content/uploads/2024/04/cao_ebook.pdf");
                    } else {
                        linksRedirecionamento.push("https://premierpet.com.br/wp-content/uploads/2024/04/cao_ebook.pdf");
                    }
                    break;
                case "Ambos":
                    if (isMobile) {
                        window.open("https://premierpet.com.br/wp-content/uploads/2024/04/cao_gato_ebook.pdf");
                    } else {
                        linksRedirecionamento.push("https://premierpet.com.br/wp-content/uploads/2024/04/cao_ebook.pdf");
                        linksRedirecionamento.push("https://premierpet.com.br/wp-content/uploads/2024/04/gato_ebook.pdf");
                    }
                    break;
                default:
                    // Tratamento de erro se nenhuma opção for selecionada
                    break;
            }
        
            // Realizar o download dos arquivos PDF para todas as opções selecionadas (caso não seja um dispositivo móvel)
            if (!isMobile) {
                linksRedirecionamento.forEach(function(link) {
                    var anchor = document.createElement('a');
                    anchor.href = link;
                    anchor.style.display = 'none'; // Oculta o elemento
                    anchor.setAttribute('download', '');
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                });
            }
            
            // Ocultar a mensagem de sucesso após 4 segundos
            setTimeout(function() {
                $('.elementor-message-success').hide();
            }, 4000);
        });
    }
});


