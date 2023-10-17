
            <!--* methode for implementing svg file -->
            <!-- <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
              <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                <use xlink:href="#bootstrap"></use>
             </svg>
            </a> -->
            
            <!--* contain ul for customer -->
            <!-- <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" class="nav-link px-2 link-secondary">Overview</a></li>
              <li><a href="#" class="nav-link px-2 link-body-emphasis">Inventory</a></li>
              <li><a href="#" class="nav-link px-2 link-body-emphasis">Customers</a></li>
              <li><a href="#" class="nav-link px-2 link-body-emphasis">Products</a></li>
            </ul> -->
            <!--* end  contain ul for customer -->
    
            <!-- search control for send data -->
            <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
            </form> -->
            <!-- end search control ul for customer -->

            <!-- * -->
            la propriété css flex-shrink permet de determiner à quelle point un élément peut rétrécir lorsque l'espace disponible est limité 
            ici elle est flex-shrink-0 , veut dire que notre élément ne reduira cas la limite de sa taille intrinsèque 

            <!-- * conseille sur display: flex -->
            En ajoutant la propriété d-flex , cela permet d'empêcher les éléments de s'etirer tout le long de l'axe principal , ils pourront se retrercir si necessaire 

            <!-- * -->
            app.use('/sign-in', express.static('public')); , j'ai utilisé cette méthode pour monter mon fichier public sur /sign-in/connected. 