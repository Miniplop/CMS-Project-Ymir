<?php

namespace Ymir\YmirTyrBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class WidgetType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('order')
            ->add('htmlElements', 'collection', array(
                'type' => new HtmlElementType(),
                'by_reference' => false,
                'allow_add' => true,
                'allow_delete' => true
            ))
            /*->add('widgetChildren', 'collection', array(
                'type' => new WidgetType(),
                'by_reference' => false,
                'allow_add' => true,
                'allow_delete' => true
            ))*/
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Ymir\YmirTyrBundle\Entity\Widget',
            'csrf_protection' => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ymir_ymirtyrbundle_widget';
    }
}
