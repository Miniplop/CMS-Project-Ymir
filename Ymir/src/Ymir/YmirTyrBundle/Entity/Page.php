<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;
use Doctrine\Common\Collections\ArrayCollection;

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
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
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
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="parent_element", cascade={"persist"})
     */
    private $widgets;

    public function __construct()
    {
         $this->widgets = new ArrayCollection();
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
    public function generateCode()
    {
        // Begining of the page
        $code = "<!doctype html>\n<HTML lang=\"fr\">\n<head>\n\t<meta charset=\"utf-8\">\n";
        // Title
        $code .= "\t<title>".$title."</title>\n";
        // Style dependancies
        $code .= "\t<link rel=\"stylesheet\" href=\""."\">\n";
        $code .= "</head>\n<body>\n";

        // Generate the different widgets, starting from rows and navigating to the children
        foreach ($this->widgets->to_array() as $w) {
            $code .= $w->generateCodeWidget();
        }

        $code .= "</body>\n</html>";

        return $code;
    }

}
