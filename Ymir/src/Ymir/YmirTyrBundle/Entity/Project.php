<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Project
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Ymir\YmirTyrBundle\Entity\ProjectRepository")
 */
class Project
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
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\User", inversedBy="projects", cascade={"persist"})
     * @ORM\JoinColumn(name="user", referencedColumnName="id", nullable=false)
     */
    protected $user;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Page", mappedBy="project", cascade={"remove"})
     */
    private $pages;

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
     * Set name
     *
     * @param string $name
     *
     * @return Project
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set user
     *
     * @param \Ymir\YmirTyrBundle\Entity\User $user
     *
     * @return Project
     */
    public function setUser(\Ymir\YmirTyrBundle\Entity\User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Ymir\YmirTyrBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set pages
     *
     * @param ArrayCollection $pages
     *
     * @return Project
     */
    public function setPages(ArrayCollection $pages)
    {
        $this->pages = $pages;

        return $this;
    }

    /**
     * Get pages
     *
     * @return ArrayCollection
     */
    public function getPages()
    {
        return $this->pages;
    }

    public function __construct()
    {
         $this->pages = new ArrayCollection();
    }

    /**
     * Add page
     *
     * @param \Ymir\YmirTyrBundle\Entity\Page $page
     *
     * @return Project
     */
    public function addPage(\Ymir\YmirTyrBundle\Entity\Page $page)
    {
        $this->pages[] = $page;

        return $this;
    }

    /**
     * Remove page
     *
     * @param \Ymir\YmirTyrBundle\Entity\Page $page
     */
    public function removePage(\Ymir\YmirTyrBundle\Entity\Page $page)
    {
        $this->pages->removeElement($page);
    }
}
