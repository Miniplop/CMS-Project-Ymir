<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as JMS;

/**
 * Page
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Ymir\YmirTyrBundle\Entity\PageRepository")
 */
class Page
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @JMS\Type("integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @JMS\Type("string")
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Project", inversedBy="pages")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", nullable=false)
     */
    protected $project;

    /**
     * @JMS\Type("ArrayCollection<Ymir\YmirTyrBundle\Entity\Widget>")
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="parentPage", cascade={"persist", "remove"})
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $widgets;

    public function __construct()
    {
         $this->widgets = new ArrayCollection();
    }

    public static function deserializeJson(Page $page, $params) 
    {
        $page->setTitle($params["title"]);
        foreach($params["widgets"] as $param)
        {
            $widget = Widget::deserializeJson($param);
            //$widget->setParentPage($page);
            $page->addWidget($widget);
        }
        return $page;

    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Page
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set project
     *
     * @param \Ymir\YmirTyrBundle\Entity\Project $project
     *
     * @return Page
     */
    public function setProject(\Ymir\YmirTyrBundle\Entity\Project $project)
    {
        $this->project = $project;

        return $this;
    }

    /**
     * Get project
     *
     * @return \Ymir\YmirTyrBundle\Entity\Project
     */
    public function getProject()
    {
        return $this->project;
    }

    /**
     * Add widget
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widget
     *
     * @return Page
     */
    public function addWidget(\Ymir\YmirTyrBundle\Entity\Widget $widget)
    {
        $widget->setParentPage($this);
        $this->widgets[] = $widget;

        return $this;
    }

    /**
     * Remove widget
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widget
     */
    public function removeWidget(\Ymir\YmirTyrBundle\Entity\Widget $widget)
    {
        $this->widgets->removeElement($widget);
    }

    /**
     * Get widgets
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getWidgets()
    {
        return $this->widgets;

    }

    /**
     * Generate Code
     * 
     */
    public function codeGen()
    {
        $content = "";
        // Generate the different widgets, starting from rows and navigating to the children
        foreach ($this->widgets->toArray() as $w) {
            $content .= $w->codeGen(0,0,0);
        }
        
        $code = 
        '<!DOCTYPE html>
            <!--[if IE 9]><html class="lt-ie10" lang="en" > <![endif]-->
            <html class="no-js" lang="en" >

            <head>
              <meta charset="utf-8">
              <!-- If you delete this meta tag World War Z will become a reality -->
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Foundation 5</title>

              <!-- If you are using the CSS version, only link these 2 files, you may add app.css to use for your overrides if you like -->
              <!--<link rel="stylesheet" href="css/normalize.css">
              <link rel="stylesheet" href="css/foundation.css"> -->

              <!-- If you are using the gem version, you need this only -->
              <!-- <link rel="stylesheet" href="css/app.css">

              <script src="js/vendor/modernizr.js"></script> -->

                
                    
                <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/normalize.css">
                <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/foundation.css">
                <script src="http://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/js/vendor/modernizr.js"></script>

            </head>
            <body>

              <!-- body content here -->' . $content.'

              <!-- <script src="js/vendor/jquery.js"></script>
              <script src="js/foundation.min.js"></script> -->

              <script src="http://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/js/vendor/jquery.js"></script>
              <script src="http://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/js/foundation.min.js"></script>

              <script>
                $(document).foundation();
              </script>
            </body>
        </html>';

        return $code;

        /*
        // Begining of the page
        $code = "<!doctype html>\n<HTML lang=\"fr\">\n<head>\n\t<meta charset=\"utf-8\">\n";
        // Title
        // $code .= "\t<title>".$title."</title>\n";
        // Style dependancies
        $code .= "\t<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/foundation.min.css\">\n";
        
        $code .= "\t<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/normalize.css\">\n";
        $code .= "\t<script src=\"//cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/js/vendor/modernizr.js\"></script>\n";
        $code .= "</head>\n<body>\n";

        // Generate the different widgets, starting from rows and navigating to the children
        foreach ($this->widgets->toArray() as $w) {
            $code .= $w->codeGen();
        }

        $code .= "<script src=\"//cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/js/vendor/jquery.js\"></script>
        <script src=\"//cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/js/foundation.min.js\"></script>
        
        <script>
            $(document).foundation();
          </script>
        </body>
            
        </html>";

        return $code;*/
    }

}
